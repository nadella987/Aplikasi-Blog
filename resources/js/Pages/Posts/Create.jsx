import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function PostCreate(props) {
    const { data, setData, post, processing, errors, } = useForm({
        judul: '',
        konten: '',
    });

    function handleSubmit(e)  {
        e.preventDefault();
        
        post(route("posts.store"));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Post</h2>}
        >
            <Head title="Tambah Post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                    
                <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel forInput="judul" value="judul post" />

                    <TextInput
                        type="text"
                        name="judul"
                        value={data.judul}
                        className="mt-1 block w-full"
                        autoComplete="judul"
                        isFocused={true}
                        handleChange={ e => setData("judul", e.target.value)}
                    />

                    <InputError message={errors.judul} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="konten" value="konten" />

                    <TextInput
                        type="text"
                        name="konten"
                        value={data.konten}
                        className="mt-1 block w-full"
                        autoComplete="current-konten"
                        handleChange={ e => setData("konten", e.target.value)}
                    />

                    <InputError message={errors.konten} className="mt-2" />
                </div>


                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                       Submit Post
                    </PrimaryButton>
                </div>
                </form>
         
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
