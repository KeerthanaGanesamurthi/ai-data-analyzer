// src/services/aiService.js

const HF_API_KEY = process.env.REACT_APP_HF_API_KEY;
const HF_API_URL = process.env.REACT_APP_HF_API_URL || "https://api-inference.huggingface.com/models";

export const generateAIInsights = async (data, columns) => {
  const hasValidAPIKey =
    HF_API_KEY && HF_API_KEY !== "" &&
    HF_API_KEY !== "your_actual_hugging_face_api_key_here";

  if (hasValidAPIKey) {
    try {
      console.log("Using Hugging Face API with key:", HF_API_KEY.substring(0, 10) + "...");
      const response = await fetch(`${HF_API_URL}/facebook/bart-large-cnn`, {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `Analyze this dataset with columns: ${columns.join(", ")}. 
          First 10 rows: ${JSON.stringify(data.slice(0, 10))}. 
          Provide business insights (sales, product comparison, payment trends, regions) in clear and simple points.`,
        }),
      });

      if (response.status === 503) {
        const responseData = await response.json();
        if (responseData.error && responseData.estimated_time) {
          console.log(`Model loading, estimated time: ${responseData.estimated_time} seconds`);
          return await generateMockInsights(data, columns);
        }
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result[0]?.summary_text || "No insights generated";
    } catch (error) {
      console.error("Error calling Hugging Face API:", error);
      return await generateMockInsights(data, columns);
    }
  } else {
    console.log("No valid API key found, using mock insights");
    return await generateMockInsights(data, columns);
  }
};

// ---------------- Business-Oriented Mock Insights ---------------- //
const generateMockInsights = async (data, columns) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // simulate API delay

  if (!data || data.length === 0) {
    return "No data available for analysis.";
  }

  // Assume we have 'Product', 'Quantity', 'Price_per_Unit', 'Payment_Method', 'Region', 'Date'
  let totalSales = 0;
  const productSales = {};
  const regionSales = {};
  const paymentCount = {};

  data.forEach(row => {
    const qty = row.Quantity || 0;
    const price = row.Price_per_Unit || 0;
    const sales = qty * price;
    totalSales += sales;

    // Product-wise sales
    if (row.Product) {
      productSales[row.Product] = (productSales[row.Product] || 0) + sales;
    }

    // Region-wise sales
    if (row.Region) {
      regionSales[row.Region] = (regionSales[row.Region] || 0) + sales;
    }

    // Payment method usage
    if (row.Payment_Method) {
      paymentCount[row.Payment_Method] = (paymentCount[row.Payment_Method] || 0) + 1;
    }
  });

  // Find top product, region, and payment
  const bestProduct = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];
  const bestRegion = Object.entries(regionSales).sort((a, b) => b[1] - a[1])[0];
  const topPayment = Object.entries(paymentCount).sort((a, b) => b[1] - a[1])[0];

  return `📊 Business Analysis:
- Total Sales: ₹${totalSales.toLocaleString()}

🏆 Best Performing:
- Product: ${bestProduct ? `${bestProduct[0]} (₹${bestProduct[1].toLocaleString()})` : "No product data"}
- Region: ${bestRegion ? `${bestRegion[0]} (₹${bestRegion[1].toLocaleString()})` : "No region data"}
- Payment Method: ${topPayment ? `${topPayment[0]} (${topPayment[1]} uses)` : "No payment data"}

✅ Recommendations:
- Focus on boosting sales of best-selling product: ${bestProduct ? bestProduct[0] : "N/A"}
- Strengthen marketing in top region: ${bestRegion ? bestRegion[0] : "N/A"}
- Promote preferred payment method (${topPayment ? topPayment[0] : "N/A"}) with cashback/discounts
- Identify underperforming products/regions and run targeted campaigns`;
};
