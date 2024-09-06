import { useAuthorized } from 'h/useAuthorized'

export function X() {
  useAuthorized()
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text-center text-violet'>Gallery</h1>
      <div className='w-full max-w-5xl'>
        {/* Adjust max-w-5xl as needed */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center'>
          {[0, 1, 2].map((index) => (
            <div key={index} className='bg-wisteria p-4 rounded-lg shadow-lg w-full max-w-xs'>
              {/* Adjust max-w-xs as needed */}
              <img
                src={`/dog${index}.avif`}
                alt={`Dog eating corndog AI generated drawing ${index + 1}`}
                className='w-full h-auto rounded object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
