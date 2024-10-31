import RegisterBackground from '@/assets/register-background.png'
import GoogleIcon from '@/assets/google.svg'
import GmailIcon from '@/assets/gmail.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Link, useNavigate } from 'react-router-dom'

const RegisterContainer = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-[100vh] bg-[#fff] flex justify-center items-center py-auto">
      <div className="w-[1400px] rounded-tl-none rounded-tr-[30px] rounded-br-[30px] rounded-bl-none border-solid border border-[#dbdbdb] relative flex">
        <div className="w-1/2 flex justify-end">
          <img src={RegisterBackground} alt="login-background" className="object-cover" />
        </div>
        <div className="w-1/2 px-[60px] justify-between flex flex-col pb-4">
          <div>
            <div className="flex items-center shrink-0 flex-nowrap h-[64px] text-[64px] leading-[64px] whitespace-nowrap font-normal">
              <span className="font-['Volkhov'] text-[#389c5a]">F</span>
              <span className="font-['Volkhov'] text-[#fca120]">B</span>
              <span className="font-['Volkhov'] text-[#399c5a]">T</span>
            </div>
            <span className="h-[16px] text-[16px]whitespace-nowrap">Food, Beverages & Treats</span>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div className="flex flex-col gap-6">
              <span className="h-[40px] text-[30px] leading-[40px]">Create Account</span>
              <div className="flex gap-4">
                <Button variant={'outline'} className="px-6 flex gap-2 h-[52px]">
                  <img src={GoogleIcon} alt="gmail-icon" className="" />
                  <span className="text-[#000000]">Sign up with Google</span>
                </Button>
                <Button variant={'outline'} className="px-6 flex gap-2 h-[52px]">
                  <img src={GmailIcon} alt="gmail-icon" className="" />
                  <span className="text-[#000000]">Sign up with Email</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-[30px] h-[5px] bg-[#828282]" />
              <span className="text-[30px] font-bold leading-[40px] text-[#828282] tracking-[2.4px]">OR</span>
              <div className="w-[30px] h-[5px] bg-[#828282]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                className="border-[#DBDBDB] border-t-0 border-r-0 border-l-0 border-b-2 rounded-none focus-visible:ring-0 h-[52px] text-[16px] leading-[24px] font-normal"
                placeholder="First Name"
              />
              <Input
                className="border-[#DBDBDB] border-t-0 border-r-0 border-l-0 border-b-2 rounded-none focus-visible:ring-0 h-[52px] text-[16px] leading-[24px] font-normal"
                placeholder="Last Name"
              />
              <Input
                className="border-[#DBDBDB] border-t-0 border-r-0 border-l-0 border-b-2 rounded-none focus-visible:ring-0 h-[52px] text-[16px] leading-[24px] font-normal"
                type="email"
                placeholder="Email Address"
              />
              <Input
                className="border-[#DBDBDB] border-t-0 border-r-0 border-l-0 border-b-2 rounded-none focus-visible:ring-0 h-[52px] text-[16px] leading-[24px] font-normal"
                placeholder="Phone Number"
              />
              <PasswordInput
                className="border-[#DBDBDB] border-t-0 border-r-0 border-l-0 border-b-2 rounded-none focus-visible:ring-0 h-[52px] text-[16px] leading-[24px] font-normal"
                placeholder="Password"
              />
              <PasswordInput
                className="border-[#DBDBDB] border-t-0 border-r-0 border-l-0 border-b-2 rounded-none focus-visible:ring-0 h-[52px] text-[16px] leading-[24px] font-normal"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex flex-col w-full">
              <Button variant={'default'} className="h-[52px]">
                Create Account
              </Button>
              <div className="w-full flex justify-center items-center">
                <span className="text-[16px]">Already have an account?</span>
                <Button
                  variant={'link'}
                  className="h-[52px] w-fit text-[#5b86e5] px-2"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <Link to={'/'}>FBT Terms & Codnitions</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterContainer
