export const PageContent = (props: {page: string|undefined}) => {
    return props.page === undefined ? (
        <div className="flex items-center justify-center w-full h-full">
            <span className="font-bold text-2xl">Use the Search above to, you know, search for things...</span>
        </div>
    ) : (
        <iframe src={`/content/${props.page}`} frameBorder="0" className="w-full h-full"></iframe>
    )
}