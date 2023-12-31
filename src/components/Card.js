import React,{useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd'


function Card({alt,src, id, index,moveImage, onLoad}) {
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "image",
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveImage(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    });
    const [{ isDragging }, drag] = useDrag({
      type: "image",
      item: () => {
        return { id, index };
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging()
        };
      }
    });
    const dragstyle ={
        opacity:0.5,
        transform: 'scale(0.8,0.8)',
    }
    const nodrag={
        opacity:1,
    }
    
    drag(drop(ref));
      
  return (
    <div className='card' ref={ref} style={isDragging?(dragstyle):(nodrag)}>
      <img src={src} alt={alt} className='img' onLoad={onLoad}/>
    </div>
  )
}

export default Card 
