import { useEffect } from "react";

export type TableConfig = {
  pagination?: {
    enabled: boolean;
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  };
};

export default function Pagination({ config }: { config?: TableConfig }) {

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && config?.pagination?.page! > 1) {
        config?.pagination?.setPage(prev => prev - 1);
      } 
      else if (
        e.key === "ArrowRight" &&
        config?.pagination?.page! < config?.pagination?.totalPages!
      ) {
        config?.pagination?.setPage(prev => prev + 1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [config?.pagination?.page, config?.pagination?.totalPages]);
  if (!config?.pagination?.enabled) return null;

  return (
    <div className="flex items-center justify-between p-3 text-white border-t">   
      <button
        disabled={config?.pagination?.page === 1}
        onClick={() => config?.pagination?.setPage(prev => prev - 1)}
        className="px-3 cursor-pointer py-1 border rounded disabled:opacity-50"
      >
        &lt;
      </button>
      <span className="text-sm">
        Page {config?.pagination?.page} of {config?.pagination?.totalPages}
      </span>
      <button
        disabled={config?.pagination?.page === config?.pagination?.totalPages}
        onClick={() => config?.pagination?.setPage(prev => prev + 1)}
        className="px-3 cursor-pointer py-1 border rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}