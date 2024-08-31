'use client';
import { Input } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import './header.css';

const { Search } = Input;

const onSearch = (value) => console.log(value);

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
          placeholder="input search text"
          onSearch={onSearch}
          enterButton 
          style={{
            width: 300,
          }}/>
      </div>
    </header>
  );
};

export default TopHeader;
