import { useState } from "react";
import { PageContent } from "./components/content";
import filelist from "./assets/filelist.json";

interface SearchResult {
  title: string,
  location: string,
}

function App() {
  const [page, updatepage] = useState<string|undefined>(undefined);
  const [searchResults, updateSearchResults] = useState<SearchResult[]|undefined>(undefined);

  const search = (term:string) => {
    if(term.length > 3) {
      const allResults = filelist.pages.filter(r => r.title.toLowerCase() === term.toLowerCase());
      const results = allResults.slice(0, 10)
      updateSearchResults(results)
    } else {
      updatepage(undefined)
      updateSearchResults(undefined)
    }
  }

  const handleResultClick = (val: string) => {
    updateSearchResults(undefined);
    updatepage(val)
  }

  return (
    <div className="h-screen flex flex-col">
        <header className="bg-blue-950 py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-24">
                    <div className="pr-4 flex items-center">
                        <img src="/logo.webp" className="w-20 h-auto" />
                        <span className="font-bold text-2xl text-white">Old Confluence</span>
                    </div>
                    <div className="w-2/3 relative">
                        <label className="input input-bordered flex items-center gap-2 text-blue-300">
                            <input type="text" className="grow" placeholder="Search" onChange={(e) => search(e.target.value)}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                        { (searchResults !== undefined && searchResults.length > 0) && 
                              <div className="card w-full bg-base-100 shadow-xl absolute -top-100 z-10 mt-2">
                                <div className="card-body p-4">
                                    <ul className="list-none">
                                      {searchResults?.map((result:SearchResult, index) => (
                                        <li key={index} className="my-2">
                                          <button className="btn btn-sm w-full btn-primary" value={result.location} onClick={(e) => handleResultClick(e.target.value)}>{result.title}</button>
                                        </li>
                                      ))}
                                    </ul>
                                </div>
                              </div>
                        }
                    </div>
                </div>
            </div>
        </header>
        <main className="flex-grow bg-white py-4 text-slate-900">
          <PageContent page={page}/>
        </main>
    </div>
  )
}

export default App
