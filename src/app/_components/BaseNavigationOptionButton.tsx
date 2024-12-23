type Props = {
  children: React.ReactNode;
  className: string | undefined;
}
const BaseNavigationOptionButton = ({ children, className } : Props) => {

  return <button className={`text-white text-sm px-3 py-1 rounded-3xl hover:bg-red-dusty-dark font-light ` + className}>{children}</button>
}

export default BaseNavigationOptionButton;