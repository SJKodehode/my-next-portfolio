export const metadata = {
  title: 'UI/UX Showcase',
  description: 'En samling av interaktive UI/UX-komponenter av Jørgen Sørheim',
}

export default function ShowcaseLayout({ children }) {
  return (
    <div className=" min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  )
}
