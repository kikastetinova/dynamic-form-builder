type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="d-flex flex-cloumn">
      <p className="font-semibold text-gray-500 uppercase tracking-widest border-b-4 h-14 w-full mb-4 border-emerald-400 text-center leading-5 py-4">
        Tree Match App
      </p>
      <div className="max-w-none md:max-w-lg m-auto pt-14 px-6 sm:px-0">{children}</div>
    </div>
  );
};

export default Layout;
