import Image from "./Image.jsx";

export default function PlaceImg({place,index=0,className=null}) {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = "w-full h-60 object-cover object-center";
  }
  return (
    <Image className={className} src={place.photos[index]} alt=""/>
  );
}