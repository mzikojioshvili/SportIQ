import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

const SignInForm = ({ onSubmit: handleFormSubmit }) => {
    const [showPw, setShowPw] = useState(false)
    const [apiError, setApiError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' })

    const onSubmit = async (data) => {
        setApiError(null)
        setSubmitting(true)
        try {
            await handleFormSubmit(data)
        } catch (err) {
            setApiError(err.response?.data?.message || err.message || 'Authentication failed')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#71717A]">Email</label>
                <input
                    type="text"
                    placeholder="you@example.com"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all bg-black border border-white/10 focus:border-white/30"
                />
                {errors.email && (
                    <p className="text-[10px] text-[#E50914] mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#71717A]">Password</label>
                <div className="relative">
                    <input
                        type={showPw ? 'text' : 'password'}
                        placeholder="********"
                        {...register('password', { required: 'Password is required' })}
                        className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white outline-none transition-all bg-black border border-white/10 focus:border-white/30"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors text-[#52525B] hover:text-white"
                    >
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-[10px] text-[#E50914] mt-1">{errors.password.message}</p>
                )}
            </div>

            <div className="flex justify-end -mt-1">
                <button type="button" className="text-xs transition-colors text-[#52525B] hover:text-white">
                    Forgot password?
                </button>
            </div>

            {apiError && <p className="text-xs text-[#E50914] mt-1 text-center">{apiError}</p>}

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl font-black text-sm text-black bg-white hover:bg-white/90 transition-all active:scale-[0.98] mt-1 disabled:opacity-50 tracking-[-0.01em]"
            >
                {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
        </form>
    )
}

export default SignInForm