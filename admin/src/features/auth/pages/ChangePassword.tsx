import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { changePasswordSchema } from '@trio/shared/auth';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardBody } from '@/components/ui/Card';
import { Form } from '@/components/forms/Form';
import { Field } from '@/components/forms/Field';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import { useChangePasswordMutation } from '../hooks';
import { toast } from '@/hooks/useToast';

const formSchema = changePasswordSchema
    .extend({ confirmPassword: z.string().min(1) })
    .refine((v) => v.newPassword === v.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    })
    .refine((v) => v.newPassword !== v.currentPassword, {
        path: ['newPassword'],
        message: 'New password must differ from current password',
    });
type FormValues = z.infer<typeof formSchema>;

function Fields({ pending }: { pending: boolean }) {
    const { register } = useFormContext<FormValues>();
    const nav = useNavigate();
    return (
        <div className="space-y-4">
            <Field name="currentPassword" label="Current password">
                <PasswordInput
                    autoComplete="current-password"
                    {...register('currentPassword')}
                />
            </Field>
            <Field name="newPassword" label="New password" description="At least 8 characters">
                <PasswordInput autoComplete="new-password" {...register('newPassword')} />
            </Field>
            <Field name="confirmPassword" label="Confirm new password">
                <PasswordInput autoComplete="new-password" {...register('confirmPassword')} />
            </Field>
            <div className="flex items-center justify-end gap-2 pt-1">
                <Button type="button" variant="ghost" onClick={() => nav(-1)}>
                    Cancel
                </Button>
                <Button type="submit" loading={pending}>
                    Change password
                </Button>
            </div>
        </div>
    );
}

export default function ChangePassword() {
    const nav = useNavigate();
    const mutation = useChangePasswordMutation();

    return (
        <div className="mx-auto w-full max-w-lg">
            <PageHeader title="Change password" description="Update your account password" />
            <Card>
                <CardBody>
                    <Form
                        schema={formSchema}
                        defaultValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        onSubmit={(values) =>
                            mutation.mutate(
                                {
                                    currentPassword: values.currentPassword,
                                    newPassword: values.newPassword,
                                },
                                {
                                    onSuccess: () => {
                                        toast.success('Password changed');
                                        nav('/overview');
                                    },
                                    onError: (err: unknown) => {
                                        const msg =
                                            (err as { response?: { data?: { error?: string } } })
                                                .response?.data?.error ??
                                            'Failed to change password';
                                        toast.error(msg);
                                    },
                                },
                            )
                        }
                        className="space-y-5"
                    >
                        <Fields pending={mutation.isPending} />
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}
