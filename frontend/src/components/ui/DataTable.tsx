import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileX } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (val: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  itemsPerPage?: number;
}

export function DataTable<T>({ 
  data, 
  columns, 
  onRowClick, 
  searchable = true,
  searchKeys = [],
  itemsPerPage = 10 
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T, direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Search Filter
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    const lowercasedSearch = searchTerm.toLowerCase();
    return data.filter(item => {
      const keys = searchKeys.length > 0 ? searchKeys : Object.keys(item as object) as (keyof T)[];
      return keys.some(key => {
        const val = item[key];
        return val && String(val).toLowerCase().includes(lowercasedSearch);
      });
    });
  }, [data, searchTerm, searchKeys]);

  // Sort Filter
  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col font-sans">
      {searchable && (
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-label text-secondary uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => requestSort(col.accessor)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {sortConfig?.key === col.accessor && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 text-sm text-foreground">
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor] as any}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-secondary">
                  <div className="flex flex-col items-center justify-center">
                    <FileX size={32} className="text-gray-300 mb-2" />
                    <p>No records found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-secondary bg-gray-50">
          <div>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1 border border-gray-200 rounded hover:bg-white disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1 border border-gray-200 rounded hover:bg-white disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
