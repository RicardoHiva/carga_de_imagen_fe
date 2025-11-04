
function MainLayout(props: {children: React.ReactNode}) {
  return (
    <>
    <main className='w-full h-screen'>
        {props.children}
      </main>
    </>
  )
}

export default MainLayout