import Nav from "../components/nav";

export default function SubjectForm() {
  return (
    <>
      <Nav></Nav>
      <div className="w-full pt-5">
        <form className="p-4">
          <label className="block text-dark-green text-xl font-bold">
            Materia
          </label>
          <input
            placeholder="Nombre"
            className="outline-2 outline-gray-400 focus:outline-dark-green rounded-xl p-1.5 w-full"
            type="text"
          />
          <label className="hidden text-dark-green text-xl font-bold">
            Descripcion
          </label>
          <input
            placeholder="Descripcion"
            className="mt-2 outline-2 outline-gray-400 focus:outline-dark-green rounded-xl p-1.5 w-full h-20"
            type="text"
          />
          <div className="mt-2">
            <h2 className="text-xl">
              Agregá tus{" "}
              <span className="text-dark-green font-bold">unidades</span>
            </h2>
            <div className="">
              <ul className="flex space-x-2">
                <div className="flex flex-col justify-between py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="outline-2 outline-gray-400 focus:outline-dark-green rounded-xl p-1.5 w-full h-18"
                  placeholder="Unidad 1"
                />
              </ul>
              <div className="ml-8 mt-4">
                <div className="flex space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Tema 1"
                    className="focus:outline-1 focus:outline-dark-green rounded-xl px-2"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <button className="mt-2 rounded-xl outline-1 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end text-white">
            <button className="flex space-x-3 items-center text-center bg-dark-green rounded-xl py-2 px-2">
              <p>Agregar Unidad</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="fixed bottom-0 mb-2 flex justify-center w-full">
            <button className="flex justify-center space-x-2 bg-dark-green p-2 rounded-xl text-white w-5/6">
              <p>Guardar Materia</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
