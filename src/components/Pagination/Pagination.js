import { Pagination as PaginationAnt } from 'antd';
import './Pagination.css';

export default function Pagination({ onPageChanged, page, totalResults }) {
  return (
    <PaginationAnt
      basic
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginBottom: '16px',
      }}
      onChange={onPageChanged}
      current={page}
      total={totalResults}
      showSizeChanger={false}
      pageSize={20}
    />
  );
}
