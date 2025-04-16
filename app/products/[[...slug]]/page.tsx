// create interface with [slug] as string[] and use it in the component
interface Props {
  params: { slug: string[] };

  // to access query string parameters we use a different method called useSearchParams
  searchParams: { sortOrder: string };
}
// destructure [params] from [Props]
//destructure [slug] from [params]
// destructure [searchParams] from [Props]
// destructure [sortOrder] from [searchParams]
const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      ProductPage {slug} {sortOrder}
    </div>
  );
};

export default ProductPage;
