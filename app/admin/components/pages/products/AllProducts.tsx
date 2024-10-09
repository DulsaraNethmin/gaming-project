// import { useState } from "react";
// import { AllProductsNew, columns } from "./all-products/columns";
// import { DataTable } from "./all-products/data-table";
// import AddProducts from "./all-products/AddProducts";
// import EditAllProductsPopup from "./all-products/EditAllProductsPopup";
// import { ColumnDef } from "@tanstack/react-table";

// // Initial data function
// function getInitialData(): AllProductsNew[] {
//   return [
//     {
//       imageUrl: "/images/sample-pic.png",
//       id: "728ed52f",
//       name: "Wukong",
//       sku: "#w0342",
//       stock: "In Stock",
//       selling_price: "$40",
//       regular_price: "$60",
//       status: "Public",
//       date: "23/05/2024",
//     },
//     {
//       imageUrl: "/images/sample-pic.png",
//       id: "728ed52g",
//       name: "UFO 50",
//       sku: "#u0343",
//       stock: "In Stock",
//       selling_price: "$40",
//       regular_price: "$60",
//       status: "Public",
//       date: "23/05/2024",
//     },
//   ];
// }

// export default function AllProducts() {
//   const [products, setProducts] = useState<AllProductsNew[]>(getInitialData());
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<AllProductsNew | null>(
//     null
//   );

//   // Function to add a new product
//   const handleAddProduct = (newProduct: AllProductsNew) => {
//     setProducts((prevProducts) => [...prevProducts, newProduct]);
//   };

//   // Function to delete a product by ID
//   const handleDeleteProduct = (id: string) => {
//     setProducts((prevProducts) =>
//       prevProducts.filter((product) => product.id !== id)
//     );
//   };

//   // Add a delete column to the columns definition
//   const deleteColumn: ColumnDef<AllProductsNew> = {
//     header: "Actions",
//     id: "actions",
//     cell: ({ row }) => (
//       <button
//         className="bg-red-500 text-white px-2 py-1 rounded"
//         onClick={() => handleDeleteProduct(row.original.id)}
//       >
//         Delete
//       </button>
//     ),
//   };

//   const columnsWithDelete: ColumnDef<AllProductsNew>[] = [
//     ...columns,
//     deleteColumn,
//   ];

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-4">All Products</h1>

//       {/* Add Products Component */}
//       <AddProducts onAddProduct={handleAddProduct} />

//       {/* Data Table */}
//       <DataTable columns={columnsWithDelete} data={products} />
//     </div>
//   );
// }

import { useState } from "react";
import { AllProductsNew, columns } from "./all-products/columns";
import { DataTable } from "./all-products/data-table";
import AddProducts from "./all-products/AddProducts";
import EditAllProductsPopup from "./all-products/EditAllProductsPopup";
import { ColumnDef } from "@tanstack/react-table";

// Initial data function
function getInitialData(): AllProductsNew[] {
  return [
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52f",
      name: "Wukong",
      sku: "#w0342",
      stock: "In Stock",
      selling_price: "$40",
      regular_price: "$60",
      status: "Public",
      date: "23/05/2024",
    },
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52g",
      name: "UFO 50",
      sku: "#u0343",
      stock: "In Stock",
      selling_price: "$40",
      regular_price: "$60",
      status: "Public",
      date: "23/05/2024",
    },
  ];
}

export default function AllProducts() {
  const [products, setProducts] = useState<AllProductsNew[]>(getInitialData());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AllProductsNew | null>(
    null
  );

  // Function to add a new product
  const handleAddProduct = (newProduct: AllProductsNew) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Function to delete a product by ID
  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // Function to open the edit modal with the selected product
  const handleEditProduct = (product: AllProductsNew) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Function to save the edited product
  const handleSaveProduct = (updatedProduct: AllProductsNew) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  // Add delete and edit columns to the columns definition
  const actionColumn: ColumnDef<AllProductsNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteProduct(row.original.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditProduct(row.original)}
        >
          Edit
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllProductsNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* Add Products Component */}
      <AddProducts onAddProduct={handleAddProduct} />

      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={products} />

      {/* Edit Product Modal */}
      <EditAllProductsPopup
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
