import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

const SignUpForm = ({ onSubmit: handleFormSubmit }) => {
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
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-semibold mb-1.5 text-[#71717A]">First Name</label>
                    <input
                        type="text"
                        placeholder="Alex"
                        {...register('firstName', { required: 'Required' })}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all bg-black border border-white/10 focus:border-white/30"
                    />
                    {errors.firstName && (
                        <p className="text-[10px] text-[#E50914] mt-1">{errors.firstName.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-semibold mb-1.5 text-[#71717A]">Last Name</label>
                    <input
                        type="text"
                        placeholder="Johnson"
                        {...register('lastName', { required: 'Required' })}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all bg-black border border-white/10 focus:border-white/30"
                    />
                    {errors.lastName && (
                        <p className="text-[10px] text-[#E50914] mt-1">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#71717A]">Date of Birth</label>
                <input
                    type="date"
                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all bg-black border border-white/10 focus:border-white/30"
                />
                {errors.dateOfBirth && (
                    <p className="text-[10px] text-[#E50914] mt-1">{errors.dateOfBirth.message}</p>
                )}
            </div>

            <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#71717A]">Email</label>
                <input
                    type="text"
                    placeholder="you@example.com"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
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
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        })}
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

            {apiError && <p className="text-xs text-[#E50914] mt-1 text-center">{apiError}</p>}

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl font-black text-sm text-black bg-white hover:bg-white/90 transition-all active:scale-[0.98] mt-1 disabled:opacity-50 tracking-[-0.01em]"
            >
                {submitting ? 'Authenticating...' : 'Create Account'}
            </button>
        </form>
    )
}

export default SignUpForm