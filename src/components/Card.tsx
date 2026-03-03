export function Card({ img, onClick }: { img: string; onClick: () => void }) {
  return (
    <div className='card' onClick={onClick}>
      <img src={img} alt='' />
    </div>
  );
}
