import crypto from 'crypto';
import { logger } from '../config/logger';

export interface DocumentChunk {
  chunk_id: string;
  level: 'document' | 'section' | 'paragraph' | 'sentence' | 'table';
  content: string;
  metadata: Record<string, any>;
  parent_id?: string;
  children_ids: string[];
}

export interface DocumentProcessingResult {
  metadata: {
    title?: string;
    doi?: string;
    authors?: string[];
    publicationDate?: string;
    studyType?: string;
  };
  chunks: DocumentChunk[];
}

/**
 * Intelligent Multi-Level Semantic Segmentation Pipeline
 * Replaces flat chunking with a hierarchical tree (Document -> Section -> Paragraph -> Sentence).
 */
export const processDocumentHierarchical = async (text: string, filename: string): Promise<DocumentProcessingResult> => {
  logger.info(`[Document Engine] Starting hierarchical semantic segmentation for: ${filename}`);
  
  // 1. Normalize Text
  const normalizedText = text.replace(/\r\n/g, '\n');
  
  // 2. Extract Metadata (Heuristics for DOI, Authors, Dates)
  const metadata = extractMetadata(normalizedText, filename);

  const chunks: DocumentChunk[] = [];
  const rootId = generateChunkId('doc', filename);
  
  const rootChunk: DocumentChunk = {
    chunk_id: rootId,
    level: 'document',
    content: metadata.title || filename,
    metadata: { ...metadata, source: filename },
    children_ids: []
  };

  // 3. Split by Sections (Headings)
  const sectionRegex = /(?:\n|^)(#{1,6}\s+.*|\n[A-Z][\w\s]+\n[=-]+)(?=\n|$)/g;
  let match;
  let lastIndex = 0;
  const rawSections: { heading: string, content: string }[] = [];
  
  while ((match = sectionRegex.exec(normalizedText)) !== null) {
    if (lastIndex < match.index) {
      rawSections.push({
        heading: rawSections.length > 0 ? rawSections[rawSections.length - 1].heading : 'Introduction',
        content: normalizedText.substring(lastIndex, match.index).trim()
      });
    }
    const headingText = match[1].replace(/^[#=\-\s]+|[#=\-\s]+$/g, '').trim();
    lastIndex = match.index + match[0].length;
    rawSections.push({ heading: headingText, content: '' });
  }
  
  if (lastIndex < normalizedText.length) {
    rawSections.push({
      heading: rawSections.length === 0 ? 'General' : rawSections[rawSections.length - 1].heading,
      content: normalizedText.substring(lastIndex).trim()
    });
  }

  // 4. Build Hierarchy
  for (const section of rawSections) {
    if (!section.content) continue;
    
    const sectionId = generateChunkId('sec', section.heading + section.content.substring(0, 50));
    rootChunk.children_ids.push(sectionId);
    
    const sectionChunk: DocumentChunk = {
      chunk_id: sectionId,
      level: 'section',
      content: section.heading,
      parent_id: rootId,
      metadata: { heading: section.heading, source: filename },
      children_ids: []
    };

    // Split paragraphs
    const paragraphs = section.content.split(/\n\s*\n/);
    for (const p of paragraphs) {
      if (p.trim().length < 10) continue;
      
      const paraId = generateChunkId('par', p);
      sectionChunk.children_ids.push(paraId);
      
      const paraChunk: DocumentChunk = {
        chunk_id: paraId,
        level: 'paragraph',
        content: p.trim(),
        parent_id: sectionId,
        metadata: { heading: section.heading, source: filename },
        children_ids: []
      };

      // Split sentences
      const sentences = p.match(/[^.!?]+[.!?]+/g) || [p];
      for (const s of sentences) {
        if (s.trim().length < 5) continue;
        const sentId = generateChunkId('sen', s);
        paraChunk.children_ids.push(sentId);
        
        chunks.push({
          chunk_id: sentId,
          level: 'sentence',
          content: s.trim(),
          parent_id: paraId,
          metadata: { source: filename },
          children_ids: []
        });
      }
      chunks.push(paraChunk);
    }
    chunks.push(sectionChunk);
  }

  chunks.push(rootChunk);
  logger.info(`[Document Engine] Generated ${chunks.length} hierarchical chunks.`);
  return { metadata, chunks };
};

const extractMetadata = (text: string, filename: string) => {
  const doiMatch = text.match(/\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)\b/i);
  const yearMatch = text.match(/\b(19|20)\d{2}\b/);
  
  return {
    title: filename.replace(/\.(pdf|docx|txt|csv)$/i, ''),
    doi: doiMatch ? doiMatch[1] : undefined,
    publicationDate: yearMatch ? yearMatch[0] : undefined,
  };
};

const generateChunkId = (prefix: string, content: string): string => {
  const hash = crypto.createHash('sha256').update(content).digest('hex').substring(0, 8);
  return `${prefix}_${hash}`;
};
