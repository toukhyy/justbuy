import './style.scss';

type Sizes = 'FULL' | 'HALF' | 'THIRD' | 'TWO-THIRDS';

const sizeObj = {
  THIRD: 33.33,
  HALF: 50,
  'TWO-THIRDS': 66.67,
  FULL: 100,
};

type Props = {
  size?: Sizes;
};

export function Divider({ size = 'FULL' }: Props) {
  return (
    <div
      className="divider"
      style={{ width: `${sizeObj[size as keyof typeof sizeObj]}%` }}
    ></div>
  );
}
