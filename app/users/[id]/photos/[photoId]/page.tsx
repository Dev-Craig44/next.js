interface Props {
  params: { id: number; photoId: number };
}

const PhotoDetailPage = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      User: {id} Photo: {photoId}
    </div>
  );
};

export default PhotoDetailPage;
