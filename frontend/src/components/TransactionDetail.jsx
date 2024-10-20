import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { AiFillBackward } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { getTransaction } from '../actions/transactionAction';
import LoadingSpinner from './layout/LoadingSpinner';
import { clearErrors } from '../slices/transactionSlice';

const TransactionDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { transaction, loading = true, error } = useSelector(state => state.transactionState);

    useEffect(() => {
        dispatch(getTransaction(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [error]);

    return (
        <>
            {
                loading ? <LoadingSpinner /> :

                    <div className="max-w-4xl mx-auto p-4">
                        <Link to="/" className="mb-4 block">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600">
                                <AiFillBackward className="mr-2" /> <span>Back</span>
                            </button>
                        </Link>

                        <h2 className="text-2xl font-bold mb-4 text-center">{transaction?.title}</h2>

                        <div className="p-4 flex flex-col md:flex-row gap-6 border border-gray-300 rounded-lg shadow-sm">
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                                <img
                                    src={transaction?.image}
                                    alt={transaction?.title}
                                    className="w-64 h-64 object-cover rounded-md"
                                />
                            </div>

                            <div className="flex-grow">
                                <p className="mb-2"><strong>ID:</strong> {transaction?.id}</p>
                                <p className="mb-2"><strong>Price:</strong> ${transaction?.price?.toFixed(2)}</p>
                                <p className="mb-2"><strong>Category:</strong> {transaction?.category}</p>
                                <p className="mb-2"><strong>Description:</strong> {transaction?.description}</p>
                                <p className="mb-2"><strong>Sold:</strong>
                                    {transaction?.sold ? (
                                        <span className='text-green-500 font-semibold'>Yes</span>
                                    ) : (
                                        <span className='text-red-500 font-semibold'>No</span>
                                    )}
                                </p>
                                <p className="mb-2"><strong>Date of Sale:</strong> {new Date(transaction?.dateOfSale)?.toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default TransactionDetail;
