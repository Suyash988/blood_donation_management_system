import { CheckIcon, ClockIcon, CheckCircleIcon, ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function DonationStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-500 text-white': status === 'collected',
          'bg-yellow-400 text-white': status === 'tested',
          'bg-orange-400 text-white': status === 'released',
          'bg-red-700 text-white': status === 'discharged',
        },
      )}
    >
      {/* collected, tested, released, discharged */}
      {status === 'tested' ? (
        <>
          Testing
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'collected' ? (
        <>
          Collected
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'released' ? (
        <>
          Released
          <ArrowRightStartOnRectangleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'discharged' ? (
        <>
          Discharged
          <CheckCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
