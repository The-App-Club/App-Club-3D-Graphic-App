import {Scroll} from '@react-three/drei';
import {Item} from './Item';

const Items = () => {
  return (
    <Scroll>
      <Item
        url={`https://picsum.photos/seed/1/200/300`}
        posX={-0.5}
        posY={0}
        sizeW={50}
        sizeH={100}
        page={1}
      />
      <Item
        url={`https://picsum.photos/seed/2/200/300`}
        posX={-0.8}
        posY={-0.5}
        sizeW={50}
        sizeH={100}
        page={2}
      />
      <Item
        url={`https://picsum.photos/seed/3/200/300`}
        posX={0.5}
        posY={0.8}
        sizeW={50}
        sizeH={100}
        page={1}
      />
      <Item
        url={`https://picsum.photos/seed/4/200/300`}
        posX={0}
        posY={-0.1}
        sizeW={50}
        sizeH={100}
        page={2}
      />
      <Item
        url={`https://picsum.photos/seed/5/200/300`}
        posX={-0.3}
        posY={0.6}
        sizeW={200}
        sizeH={300}
        page={2}
      />
      <Item
        url={`https://picsum.photos/seed/6/200/300`}
        posX={0.8}
        posY={1}
        sizeW={50}
        sizeH={100}
        page={2}
      />
      <Item
        url={`https://picsum.photos/seed/7/200/300`}
        posX={-0.8}
        posY={0.8}
        sizeW={50}
        sizeH={100}
        page={3}
      />
      <Item
        url={`https://picsum.photos/seed/8/200/300`}
        posX={0.4}
        posY={0.4}
        sizeW={100}
        sizeH={150}
        page={4}
      />
      <Item
        url={`https://picsum.photos/seed/9/200/300`}
        posX={-0.4}
        posY={0.2}
        sizeW={50}
        sizeH={100}
        page={5}
      />
    </Scroll>
  );
};
export {Items};