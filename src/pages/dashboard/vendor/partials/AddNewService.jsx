import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddNewService() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subcategories: [
        { name: "", price: "", shortDescription: "", file: null },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "subcategories") {
          const subcategories = data.subcategories.map((sub) => ({
            ...sub,
            file: sub.file?.[0]?.name || "",
          }));
          formData.append("subcategories", JSON.stringify(subcategories));
        } else {
          formData.append(key, data[key]);
        }
      });

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        formData.append("userId", user.id);
      }

      const formDataObject = formDataToObject(formData);

      const response = await axios.post(
        "http://localhost:4000/addservice",
        formDataObject
      );

      if (response.status === 201) {
        toast.success("Service added successfully!");
        reset();
      } else {
        throw new Error("Failed to add service");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to add service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formDataToObject = (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-gray-200 shadow-inner rounded-lg p-6 space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-semibold text-gray-400"
            >
              Service Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Service title is required" })}
              className="w-full p-3 bg-[#d2c2b2] rounded-lg border-2 border-transparent focus:border-teal-400 transition-colors"
              placeholder="Enter the title of the service"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-semibold text-gray-400"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-3 bg-[#d2c2b2] rounded-lg border-2 border-transparent focus:border-teal-400 transition-colors"
              placeholder="Provide a detailed description of the service"
            ></textarea>
            {errors.description && (
              <p className="text-red-400 text-sm mt-2">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {fields.map((item, index) => (
          <div key={item.id} className=" rounded-lg space-y-4">
            <h3 className="text-lg font-extrabold tracking-wide text-gray-400">
              Subcategory {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => remove(index)}
              className=" text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
            >
              <i className="fas fa-trash mr-2"></i> Remove
            </button>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor={`subcategories[${index}].name`}
                  className="block mb-2 text-sm font-semibold text-gray-400"
                >
                  Subcategory Name
                </label>
                <input
                  type="text"
                  id={`subcategories[${index}].name`}
                  {...register(`subcategories.${index}.name`, {
                    required: "Subcategory name is required",
                  })}
                  className="w-full p-3 bg-[#d2c2b2] rounded-lg border-2 border-transparent focus:border-teal-400 transition-colors"
                  placeholder="Enter subcategory name"
                />
                {errors.subcategories?.[index]?.name && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.subcategories[index].name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`subcategories[${index}].price`}
                  className="block mb-2 text-sm font-semibold text-gray-400"
                >
                  Price
                </label>
                <input
                  type="number"
                  id={`subcategories[${index}].price`}
                  {...register(`subcategories.${index}.price`, {
                    required: "Price is required",
                  })}
                  className="w-full p-3 bg-[#d2c2b2] rounded-lg border-2 border-transparent focus:border-teal-400 transition-colors"
                  placeholder="Enter price"
                  step="0.01"
                />
                {errors.subcategories?.[index]?.price && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.subcategories[index].price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`subcategories[${index}].shortDescription`}
                  className="block mb-2 text-sm font-semibold text-gray-400"
                >
                  Short Description
                </label>
                <textarea
                  id={`subcategories[${index}].shortDescription`}
                  rows="2"
                  {...register(`subcategories.${index}.shortDescription`, {
                    required: "Short description is required",
                  })}
                  className="w-full p-3 bg-[#d2c2b2] rounded-lg border-2 border-transparent focus:border-teal-400 transition-colors"
                  placeholder="Enter short description"
                ></textarea>
                {errors.subcategories?.[index]?.shortDescription && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.subcategories[index].shortDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`subcategories[${index}].file`}
                  className="block mb-2 text-sm font-semibold text-gray-400"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id={`subcategories[${index}].file`}
                  {...register(`subcategories.${index}.file`)}
                  className="w-full text-sm text-gray-400 bg-[#d2c2b2] py-1 px-1 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#bfb59f] file:text-white hover:file:bg-[#d2c2b2]"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ name: "", price: "", shortDescription: "", file: null })
          }
          className="w-full py-3 mt-4 bg-[#bfb59f] text-white border-2 border-[#bfb59f] rounded-lg hover:bg-[#d2c2b2] hover:text-gray-900 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i> Add Subcategory
        </button>

        <div className="flex justify-end">
          <button
            type="submit"
            className="py-3 px-6 bg-[#bfb59f] text-white rounded-lg font-semibold hover:bg-[#d2c2b2] transition-colors"
            disabled={loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                Save
              </>
            )}
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}
