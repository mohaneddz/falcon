export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="full">
      <section className="full center p-4">
        {children}
      </section>
    </main>
  )
}