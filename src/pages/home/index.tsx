import SearchForm from "@/components/SearchForm/index";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8">
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bienvenido a nuestro Bazar
        </h1>
        <p className="text-lg text-muted-foreground">
          Encuentra todo tipo de productos para tu hogar, oficina y más.
        </p>
      </div>

      <div className="w-full max-w-xl">
        <SearchForm />
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-6">Productos destacados</h2>
      </div>
    </div>
  );
};

export default Home;
