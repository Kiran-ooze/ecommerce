import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function ProductCard({ product }) {
  return (
    <div className="
      group 
      relative 
      bg-white 
      border border-zinc-200/80 
      hover:border-zinc-300 
      rounded-2xl 
      overflow-hidden 
      transition-all 
      duration-200 
      flex 
      flex-col 
      justify-between 
      hover:shadow-xl hover:shadow-zinc-900/[0.04]
    ">
      <div>
        {/* Product Image & Badge Container */}
        <div className="relative w-full h-52 bg-zinc-100 overflow-hidden">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/400"
            }
            alt={product.name}
            className="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition-transform
              duration-300
              ease-out
            "
          />

          {/* Minimal Category Pill Badge */}
          {product.category && (
            <span className="
              absolute 
              top-3 
              left-3 
              bg-white/90 
              border border-zinc-200/80 
              text-zinc-700 
              text-[11px] 
              font-semibold 
              px-2.5 
              py-1 
              rounded-md 
              shadow-xs
              backdrop-blur-sm
            ">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="p-5">
          <h2 className="
            text-base
            font-bold
            text-zinc-900
            group-hover:text-zinc-600
            transition-colors
            line-clamp-1
            mb-1.5
          ">
            {product.name}
          </h2>

          <p className="
            text-zinc-500
            text-xs
            line-clamp-2
            leading-relaxed
            mb-4
          ">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline justify-between pt-2 border-t border-zinc-100">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Price
            </span>
            <span className="text-lg font-bold text-zinc-900">
              ₹{product.price}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 pb-5 pt-1">
        <Link
          to={`/products/${product._id}`}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            w-full
            bg-zinc-900
            hover:bg-zinc-800
            text-white
            font-semibold
            text-xs
            py-2.5
            px-4
            rounded-xl
            shadow-xs
            transition-all
            duration-150
            active:scale-[0.98]
          "
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;