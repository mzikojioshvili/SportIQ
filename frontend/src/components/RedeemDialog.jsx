import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const initialState = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
};

const inputClass =
    "h-12 w-full rounded-xl border border-white/10 bg-[#0F0F11] px-4 text-sm text-white placeholder:text-[#52525B] outline-none transition-all focus:border-[#FFD600]";

export default function RedeemDialog({
    open,
    onOpenChange,
    item,
    onSubmit,
}) {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!open) {
            setForm(initialState);
            setErrors({});
        }
    }, [open]);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (errors[e.target.name]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!form.firstName.trim()) {
            newErrors.firstName = "First name is required";
        } else if (form.firstName.trim().length < 2) {
            newErrors.firstName = "First name is too short";
        }

        if (!form.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        } else if (form.lastName.trim().length < 2) {
            newErrors.lastName = "Last name is too short";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
            newErrors.phone = "Enter a valid phone number";
        }

        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        } else if (form.address.trim().length < 5) {
            newErrors.address = "Address is too short";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        onSubmit(item, form);
    };

    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-white/10 bg-[#18181B] text-white rounded-3xl sm:max-w-lg p-8">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-2xl font-black tracking-tight">
                        Redeem Reward
                    </DialogTitle>

                    <DialogDescription className="text-[#71717A]">
                        Fill in your shipping information to receive your reward.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 rounded-2xl border border-white/10 bg-[#101012] p-3">
                    <div className="flex items-center gap-4">
                        <img
                            src={item.photo}
                            alt={item.title}
                            className="h-16 w-16 rounded-xl object-cover"
                        />

                        <div>
                            <h3 className="font-black text-white">{item.title}</h3>

                            <p className="mt-1 text-sm font-bold text-[#FFD600]">
                                {item.points.toLocaleString()} Points
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.15em] text-[#71717A]">
                                First Name
                            </label>

                            <input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="John"
                            />

                            {errors.firstName && (
                                <p className="mt-2 text-xs text-red-400">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.15em] text-[#71717A]">
                                Last Name
                            </label>

                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Doe"
                            />

                            {errors.lastName && (
                                <p className="mt-2 text-xs text-red-400">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.15em] text-[#71717A]">
                            Phone Number
                        </label>

                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="+995 555 12 34 56"
                        />

                        {errors.phone && (
                            <p className="mt-2 text-xs text-red-400">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.15em] text-[#71717A]">
                            Delivery Address
                        </label>

                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Street, City, Country"
                        />

                        {errors.address && (
                            <p className="mt-2 text-xs text-red-400">
                                {errors.address}
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter className="mt-8 flex-row justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="h-11 rounded-full border border-white/10 px-6 text-sm font-bold text-white transition hover:bg-white/5"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="h-11 rounded-full bg-white px-6 text-sm font-bold text-black transition hover:opacity-90 active:scale-[0.98]"
                    >
                        Redeem Reward
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}