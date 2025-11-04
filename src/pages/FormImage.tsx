import React from "react";
import axios from "axios";
import { useState } from "react";

function FormImage() {
    const [commerceId, setCommerceId] = useState<number | null>(null);  
    const [typeImage, setTypeImage] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errorId, setErrorId] = useState('');
    const [errorType, setErrorType] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommerceId(Number(event.target.value));
        setErrorId('');
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeImage(event.target.value);
        setErrorType('');
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files ) {
            const file = event.target.files[0];
            setImageFile(file);
            setErrorImage('');
            return
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const allowedExt = ['jpg','jpeg','png','webp']


        if (isNaN(commerceId!) || commerceId! < 1) {
            setErrorId('Debe ingresar un id válido');
            return
        }      

        if (typeImage === '') {
            setErrorType('Debe seleccionar un tipo');
            return
        }

        if (!imageFile) {
            setErrorImage('Debe seleccionar una imagen');
            return
        }

        if (!allowedExt.includes(imageFile.name.split('.').slice(-1)[0])) {
            setErrorImage('Solo se permiten imagenes de tipo .jpg, .jpeg, .png o .webp');
            return
        }

        const formData = new FormData();
        formData.append('commerceId', String(commerceId));
        formData.append('type', typeImage);
        if (imageFile){
            formData.append('image', imageFile, imageFile.name);
        }

        axios.post('http://localhost:3000/upload', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then(response => {
            setSuccessMessage(response.data.message)
        }).catch(error => {
            console.error(error.response.data.message)
            console.log(error)
        });
    }


    return (
        <section className="flex justify-center items-center h-full bg-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Cargar Imagen</h1>
                <div className="flex flex-col">
                    <label htmlFor="commerceId" className="block text-sm font-medium text-gray-700 mb-1">Comercio Nro
                    <input onChange={handleIdChange} type="number" name="commerceId" id="commerceId" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </label>
                    {
                        errorId !== '' ? (
                            <span className="text-red-500 text-xs">{errorId}</span>
                        ): (
                            <span className="h-4"></span>
                        )
                    }
                </div>
                <div className="flex flex-col">
                    <label  className="block text-sm font-medium text-gray-700 mb-1">Tipo de Imagen
                        <select value={typeImage} onChange={handleTypeChange} name="type" id="imageType" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
                            <option value="" disabled>Seleccionar tipo</option>
                            <option value="Logo">Logo</option>
                            <option value="Comercio">Comercio</option>
                            <option value="Producto">Producto</option>
                        </select>
                    </label>
                    {
                        errorType !== '' ? (
                            <span className="text-red-500 text-xs">{errorType}</span>
                        ): (
                            <span className="h-4"></span>
                        )
                    }
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 ">Archivo de Imagen
                        <input onChange={handleFileChange} type="file" name="image" id="image" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                    </label>
                    {
                        errorImage !== '' ? (
                            <span className="text-red-500 text-xs">{errorImage}</span>
                        ): (
                            <span className="h-4"></span>
                        )
                    }
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cargar</button>
                {
                    successMessage !== '' ? (
                        <span className="text-green-500  text-ms">{successMessage}</span>
                    ): (
                        <span className="h-6"></span>
                    )
                }
            </form>
        </section>
        )
}

export default FormImage
