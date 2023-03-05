import { FC, ReactNode } from 'react';

type PaginationProps = {
  currentPage: number,
  totalPages: number
  onPageClick: (page: number) => void
}

const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, totalPages, onPageClick } = props;
  const pageClassName: string = 'w-10 h-10 text-gary-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-gray-300';
  const currentPageClassName: string = 'w-10 h-10 text-white transition-colors duration-150 bg-gray-600 rounded-full focus:shadow-outline';
  const nextPageClassName: string = 'flex items-center justify-center w-10 h-10 text-gray-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-gray-300 active:bg-gray-600 active:text-white';
  const disabledNextPageClassName: string = 'flex items-center justify-center w-10 h-10 text-gray-300 transition-colors rounded-full focus:shadow-outline';

  function onNextPageClick() {
    onPageClick(currentPage + 1)
  }

  function onPrevPageClick() {
    onPageClick(currentPage - 1)
  }

  function getPages(): ReactNode[] {
    const elements: ReactNode[] = [];
    elements.push(
      <li>
        <button
          onClick={onPrevPageClick}
          disabled={currentPage === 1}
          className={currentPage === 1 ? disabledNextPageClassName : nextPageClassName}>
          <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
            <path
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
              clipRule='evenodd' fillRule='evenodd'></path>
          </svg>
        </button>
      </li>,
    );
    [...new Array(totalPages)].map((_, index) => (elements.push(
      <li>
        <button
          onClick={() => onPageClick(index + 1)}
          className={index + 1 === currentPage ? currentPageClassName : pageClassName}>
          {index + 1}
        </button>
      </li>,
    )));
    elements.push(
      <li>
        <button
          onClick={onNextPageClick}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? disabledNextPageClassName: nextPageClassName}>
          <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
            <path
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd' fillRule='evenodd'></path>
          </svg>
        </button>
      </li>,
    );
    return elements;
  }

  return (
    <nav aria-label='Page navigation'>
      <ul className='inline-flex space-x-2'>
        {getPages()}
      </ul>
    </nav>
  );
};

export default Pagination;