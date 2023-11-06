import React from 'react';
import classNames from 'classnames';

function Skeleton({ times, className }) {
  return Array(times).fill(0).map((_, i) => <div key={i} className={classNames('relative overflow-hidden bg-gray-200 rounded mb-2.5', className)}>
            <div
                className={classNames('animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-white to-gray-200')}
            />
        </div>);
}

export default Skeleton;
