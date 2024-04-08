import { Icon as Icons } from '@iconify/react';
const Icon = ({
  icon,
  className,
  width,
  rotate,
  hFlip,
  vFlip,
}: {
  icon: string;
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
}) => {
  return (
    <>
      <Icons
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </>
  );
};

export default Icon;
