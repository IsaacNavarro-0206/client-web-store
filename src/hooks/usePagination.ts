import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  limit: number;
  setCurrentPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const usePagination = ({ initialPage = 1, initialLimit = 10 }: UsePaginationProps = {}): UsePaginationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params or defaults
  const [currentPage, _setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : initialPage;
  });

  const [limit, _setLimit] = useState<number>(() => {
    const limitParam = searchParams.get('limit');
    return limitParam ? parseInt(limitParam, 10) : initialLimit;
  });

  // Update URL search params when state changes
  const updateSearchParams = useCallback((page: number, lim: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    params.set('limit', lim.toString());
    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams]);

  const setCurrentPage = useCallback((page: number) => {
    _setCurrentPage(page);
    updateSearchParams(page, limit);
  }, [limit, updateSearchParams]);

  const setLimit = useCallback((lim: number) => {
    _setLimit(lim);
    // Reset to page 1 when limit changes
    _setCurrentPage(1);
    updateSearchParams(1, lim);
  }, [updateSearchParams]);

  // Effect to sync state if URL params change externally (e.g., browser back/forward)
  useState(() => {
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const newPage = pageParam ? parseInt(pageParam, 10) : initialPage;
    const newLimit = limitParam ? parseInt(limitParam, 10) : initialLimit;

    if (newPage !== currentPage) {
      _setCurrentPage(newPage);
    }
    if (newLimit !== limit) {
      _setLimit(newLimit);
    }
  }); // Rerun only when searchParams change

  return { currentPage, limit, setCurrentPage, setLimit };
};

export default usePagination;