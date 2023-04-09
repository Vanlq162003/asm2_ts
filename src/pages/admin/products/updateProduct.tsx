import { useForm } from "react-hook-form";
import { ProductForm, productSchema } from "../../../interfaces/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProduct, updateProduct } from "../../../api/product";
import axios from "axios";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(productSchema),
    defaultValues: async () => {
      if (id) {
        return await fetchProductByID(id);
      }
    },
  });

  const fetchProductByID = async (id: number | string) => {
    try {
      const { data } = await getOneProduct(id);
      // console.log(data.images[0].base_url);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const upLoadFile = async (file: File) => {
    const CLOUD_NAME = "dymbcses9";
    const PRESET_NAME = "upload-img";
    const FOLDER_NAME = "TS";

    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);
    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const {
      data: { secure_url },
    } = response;
    return secure_url;
  };
  const onHandleSubmit = async (data: any) => {
    try {
      if (id) {
        const url_image = await upLoadFile(data.image[0]);
        const newdata = {
          ...data,
          images: [
            {
              base_url: `${url_image}`,
              is_gallery: true,
              label: null,
              large_url:
                "https://salt.tikicdn.com/cache/w1200/ts/product/43/35/ca/4630727d5a4eee189dc3dacae0bf39d7.jpg",
              medium_url:
                "https://salt.tikicdn.com/cache/w300/ts/product/43/35/ca/4630727d5a4eee189dc3dacae0bf39d7.jpg",
              position: null,
              small_url:
                "https://salt.tikicdn.com/cache/200x280/ts/product/43/35/ca/4630727d5a4eee189dc3dacae0bf39d7.jpg",
              thumbnail_url:
                "https://salt.tikicdn.com/cache/200x280/ts/product/43/35/ca/4630727d5a4eee189dc3dacae0bf39d7.jpg",
            },
            {
              base_url: `${url_image}`,
              is_gallery: true,
              label: null,
              large_url:
                "https://salt.tikicdn.com/cache/w1200/ts/product/6e/44/b5/04d9e0950060436a08e391205e25ea4c.png",
              medium_url:
                "https://salt.tikicdn.com/cache/w300/ts/product/6e/44/b5/04d9e0950060436a08e391205e25ea4c.png",
              position: null,
              small_url:
                "https://salt.tikicdn.com/cache/200x280/ts/product/6e/44/b5/04d9e0950060436a08e391205e25ea4c.png",
              thumbnail_url:
                "https://salt.tikicdn.com/cache/200x280/ts/product/6e/44/b5/04d9e0950060436a08e391205e25ea4c.png",
            },]

        }
        console.log(newdata)
        const response = await updateProduct(id, newdata);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          {...register("name")}
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <span className="text-red-500 text-sm block my-2">
          {errors.name && errors.name.message}
        </span>
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Product Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="file"
          {...register("image")}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <span className="text-red-500 text-sm block my-2"></span>
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Image
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          id="countries"
          {...register("brand")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose a brand</option>
          <option value="Samsung">Samsung</option>
          <option value="Apple">Apple</option>
        </select>
        <span className="text-red-500 text-sm block my-2">
          {errors.brand && errors.brand.message}
        </span>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            {...register("price")}
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <span className="text-red-500 text-sm block my-2">
            {errors.price && errors.price.message}
          </span>
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Price
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            {...register("original_price")}
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <span className="text-red-500 text-sm block my-2">
            {errors.original_price && errors.original_price.message}
          </span>
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Original Price
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="message"
          {...register("description")}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write here..."
          rows={10}
        ></textarea>
        <span className="text-red-500 text-sm block my-2">
          {errors.description && errors.description.message}
        </span>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default UpdateProduct;
