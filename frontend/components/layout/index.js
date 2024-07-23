export const Layout = ({ children }) => {
  return (
    <main className="">
      <header className="text-center">Header</header>
      {children}
      <footer className="text-center">Footer</footer>
    </main>
  );
};
