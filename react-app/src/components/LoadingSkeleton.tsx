import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return <div className={`skeleton ${className}`}></div>;
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="card-luxury p-6">
      <Skeleton className="w-full h-64 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen gradient-luxury flex items-center justify-center">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <Skeleton className="h-16 w-full mb-6 mx-auto max-w-2xl" />
        <Skeleton className="h-8 w-3/4 mb-8 mx-auto max-w-xl" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
