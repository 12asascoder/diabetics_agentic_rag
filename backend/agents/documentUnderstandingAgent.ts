import crypto from 'crypto';

export interface ChunkMetadata {
  title: string;
  source: string;
  page_start: number;
  page_end: number;
  chunk_id: string;
}

export interface DocumentNode {
  title: string;
  summary: string;
  page_start: number;
  page_end: number;
  content: string;
  references: string[];
  chunk_id: string;
  metadata: Record<string, any>;
}

/**
 * Intelligent semantic segmentation pipeline.
 * Preserves headings, tables, lists, and context.
 */
export const processDocument = async (text: string, filename: string): Promise<{ nodes: DocumentNode[] }> => {
  console.log(`[Document Engine] Starting semantic segmentation for: ${filename}`);
  
  // 1. Normalize text and preserve structural boundaries
  const normalizedText = text.replace(/\r\n/g, '\n');
  
  // 2. Split by semantic boundaries (Headings)
  // Assuming a rough markdown/text structure where headings might look like "\n# Heading" or "\nHeading\n======="
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
    if (rawSections.length === 0) {
      rawSections.push({ heading: 'General', content: normalizedText.trim() });
    } else {
      rawSections[rawSections.length - 1].content += '\n' + normalizedText.substring(lastIndex).trim();
    }
  }

  // 3. Chunking with overlap and preservation of tables/lists
  const nodes: DocumentNode[] = [];
  const MAX_CHUNK_SIZE = 1000; // characters
  const OVERLAP_SIZE = 200;
  
  for (const section of rawSections) {
    if (!section.content) continue;
    
    // Check if the section contains tables or lists, we try not to split them.
    // A simple heuristic is to keep the section intact if it's smaller than a threshold,
    // otherwise split logically by paragraphs.
    const paragraphs = section.content.split(/\n\s*\n/);
    let currentChunk = '';
    
    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];
      if (currentChunk.length + p.length > MAX_CHUNK_SIZE && currentChunk.length > 0) {
        // Push current chunk
        nodes.push(createNode(section.heading, currentChunk, filename));
        // Start new chunk with overlap (take the last paragraph from previous chunk if it fits)
        currentChunk = (paragraphs[i - 1]?.length < OVERLAP_SIZE ? paragraphs[i - 1] + '\n\n' : '') + p;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + p;
      }
    }
    if (currentChunk) {
      nodes.push(createNode(section.heading, currentChunk, filename));
    }
  }

  // 4. Eliminate duplicate segments
  const uniqueNodes = deduplicateNodes(nodes);

  console.log(`[Document Engine] Generated ${uniqueNodes.length} unique semantic chunks.`);
  return { nodes: uniqueNodes };
};

const createNode = (title: string, content: string, source: string): DocumentNode => {
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  return {
    title,
    summary: content.substring(0, 100) + '...',
    page_start: 1, // Simulated page number extraction
    page_end: 1,
    content,
    references: [],
    chunk_id: `chunk_${hash.substring(0, 8)}`,
    metadata: { source, extracted_at: new Date().toISOString() }
  };
};

const deduplicateNodes = (nodes: DocumentNode[]): DocumentNode[] => {
  const seen = new Set<string>();
  return nodes.filter(node => {
    if (seen.has(node.chunk_id)) return false;
    seen.add(node.chunk_id);
    return true;
  });
};
