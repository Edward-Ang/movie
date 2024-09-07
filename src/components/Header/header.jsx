'use client';
import { Input } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import './header.css';
import './headerMedia.css';

const { Search } = Input;

const onSearch = (value) => {
  if (!value || value.trim() === '') {
    return; // Exit the function without performing a search
  }
  window.location.href = `/search/${value}`;
}

const TopHeader = () => {
  return (
    <header>
      <div className="header-container">
        <Link className='header-logo' href='/'>
          <Image
            className='logo'
            src='/favicon.ico'
            alt='logo'
            width={32} // Adjust the width as needed
            height={32} // Adjust the height as needed
          />
          <h2 className='name'>PopWatch</h2>
        </Link>
        <Search
          className='custom-search'
          placeholder="Search for movies..."
          onSearch={onSearch}
          allowClear
          enterButton 
          style={{
            width: 300,
          }}/>
      </div>
    </header>
  );
};

export default TopHeader;
