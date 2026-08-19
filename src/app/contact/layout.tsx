

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <div className="h-full w-full">
            <h1>contact layout</h1>
            {children}
        </div>
    );
}
