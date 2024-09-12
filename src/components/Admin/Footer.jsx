function Footer({ children }) {
  return (
    <footer className=" w-full flex flex-col gap-0 items-center text-white bg-red-400">
      <div className=" bg-primary text-background text-center">
        QUICKBITE © 2024
      </div>
      {children && <div>{children}</div>}
    </footer>
  );
}
export default Footer;
