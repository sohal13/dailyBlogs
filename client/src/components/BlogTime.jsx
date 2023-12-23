import React from 'react';

const BlogTime = ({ blog }) => {

    if (!blog || !blog.createdAt) {
        return <p className='text-[8px] px-2'>Date not available</p>;
      }
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(blog.createdAt));

  return (
    <div>
      <p className='text-[10px] px-2'>{formattedDate}</p>
    </div>
  );
};

export default BlogTime;
