// create interface with [slug] as string[] and use it in the component
interface Props {
  params: { slug: string[] };
}
// destructure [params] from [Props]
//destructure [slug] from [params]
const ProductPage = ({ params: { slug } }: Props) => {
  return <div>ProductPage {slug}</div>;
};

export default ProductPage;
