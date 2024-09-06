import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-y-2 items-center justify-center'>
      <a
        className='underline text-center'
        href="https://en.wikipedia.org/wiki/On_the_Internet,_nobody_knows_you're_a_dog"
      >
        We won't know if you're a dog
      </a>
      <p className='text-center'>But we will make sure you're 18.</p>
      <p className='text-center'>
        This website demoes gating restricted <s>adult</s>{' '}
        dog content by verifying a privacy-preserving proof of your age with{' '}
        <a className='underline' href='https://openpassport.app'>openpasport</a>.
      </p>
      <p className='text-center'>
        The name of this website is a joke: <b>You won't see any adult content here.</b>
      </p>
      <div className='bg-wisteria p-6 rounded-lg shadow-lg space-y-4 text-s'>
        <h2 className='text-xl font-bold text-violet'>Get Started</h2>
        <ol className='list-decimal list-inside space-y-2'>
          <li>
            Download the OpenPassport mobile app:
            <a className='underline ml-2' href='https://apps.apple.com/us/app/proof-of-passport/id6478563710'>iOS</a>
            <a className='underline ml-2' href='https://play.google.com/store/apps/details?id=com.proofofpassportapp'>
              Android
            </a>
          </li>
          <li>Add mock or real passport data in the mobile app</li>
          <li>
            <p className='inline'>Then click here to:</p>
            <button
              type='button'
              className='bg-violet hover:bg-pink'
              onClick={() => {
                navigate('/login')
              }}
            >
              login
            </button>
          </li>
          <li>Scan the QR code and trigger the verifycation with your mobile app</li>
        </ol>
      </div>
    </div>
  )
}
