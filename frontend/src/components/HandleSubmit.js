const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const { name, description, details, price, duration, country, image } =
    formData;

  if (!name || !description || !details || !price || !duration || !country) {
    setError("All fields are required.");
    setLoading(false);
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", name);
  formDataToSend.append("description", description);
  formDataToSend.append("details", details);
  formDataToSend.append("price", price);
  formDataToSend.append("duration", duration);
  formDataToSend.append("country", country);
  if (image) {
    formDataToSend.append("image", image); // Ensure this is the correct file object
  }

  try {
    const response = await fetch("http://localhost:5000/destinations/add", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to add destination.");
    }

    const newDestination = await response.json();
    console.log("Destination added successfully:", newDestination);

    setFormData({
      name: "",
      description: "",
      details: "",
      price: "",
      duration: "",
      image: null,
      country: "",
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
