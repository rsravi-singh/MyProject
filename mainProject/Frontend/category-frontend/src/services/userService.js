import axios from "axios";
// const BASE_URL = "http://ec2-3-7-66-169.ap-south-1.compute.amazonaws.com:8080/user";
import { config } from "../config";

const token = sessionStorage.getItem("jwt");

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwt");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Your session has expired. Please log in again.");
      sessionStorage.clear();
      // Redirect
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); // Give user a moment to see toast
    }
    return Promise.reject(error);
  }
);


export async function addNewUser(user) {
  try {
    const url = `${config.serverURL}/user/signup`;
    const response = await axios.post(url, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      
    });
    console.log("response: ", response);
    if (response.status === 201) {
      return response;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export const getCustomerProfileById = async () => {
  try {
    const url = `${config.serverURL}/user/profile`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile data: ", res);

    if (res.status === 200) {
      return res.data;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getEmployeeProfileById = async () => {
  try {
    const url = `${config.serverURL}/user/employeeprofile`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile data: ", res);
    if (res.status == 200) {
      return res.data;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getAdminProfileById = async () => {
  try {
    const url = `${config.serverURL}/user/adminprofile`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile data: ", res);
    if (res.status == 200) {
      return res.data;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const createLoanQuery = async (body) => {
  try {
    const url = `${config.serverURL}/user/loanquery`;
    const res = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getAllLoanById = async () => {
  try {
    const url = `${config.serverURL}/user/loanquery`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const getAllLoanByEmpId = async () => {
  try {
    const url = `${config.serverURL}/employee/loanquery`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const sendResponseLoanById = async (queryid, message) => {
  try {
    const body = {
      response: message,
    };
    const url = `${config.serverURL}/employee/loanquery/${queryid}`;
    const res = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    console.log("Query data: ", res);
    if (res.status == 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};

export const updateCustomerProfileById = async (userData) => {
  try {
    const url = `${config.serverURL}/user/profile`;
    const res = await axios.put(url, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("response data: ", res);
    if (res.status === 200) {
      return res;
    }
  } catch (ex) {
    console.log("exception: ", ex);
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${config.serverURL}/user/login`,
      { email, password },
      {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
 
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
    throw new Error(errorMessage); // throw as an Error object
  }
};

export async function getCustomerStatement() {
  try {
    const url = `${config.serverURL}/transaction/alltransactions`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      validateStatus: () => true, // prevent axios from throwing on non-2xx
    });

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      // If backend sent a message
      const message = response.data?.message || response.data?.error || "Something went wrong";
      return { success: false, message };
    }
  } catch (error) {
    console.error("Failed to fetch statement:", error);

    if (error.response?.status === 401) {
      return { success: false, message: "Unauthorized – please log in again" };
    }

    return { success: false, message: "Server not reachable" };
  }
}


export async function LoanCard1(user) {
  try {
    const url = `${config.serverURL}/deposit/savedeposit`;
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      user,
    });
    // const response = await axios.post(url, user, {});
    console.log("response: ", response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export const saveLoanByUserId = async (loan) => {
  try {
    const url = `${config.serverURL}/user/loans/saveloan`;
    const body = {
      amount: loan.amount,
      tenureMonths: loan.tenure,

      totalEmis: loan.emiLeft,
      emiAmount: loan.emi,
      interestRate: loan.interestRate,
      status: "PENDING"
    };
    console.log(body)
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("loan data: ", res);
    if (res.status == 200) {
      return res.data;
    }
  } catch (ex) {
    console.error("Error submitting loan:", ex.message);
    console.log("exception: ", ex);
  }
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(
    `${BASE_URL}/verifyOtp`,
    { email, otp },
    { withCredentials: true }
  );
  console.log(response);
  return response.data;
};
export const getCustomerDashBoardDetailByUserId = async () => {
  try {
    const url = `${config.serverURL}/customer/dashboard`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // validateStatus: () => true, // prevent axios from throwing on non-2xx
    });

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data?.error || "Something went wrong" };
    }
  } catch (ex) {
    console.error("Error while fetching dashboard data:", ex);
    return { success: false, message: "Server not reachable" };
  }
};


export const updateCardDetailByUserId = async (body) => {
  try {
    console.log(body);
    const url = `${config.serverURL}/transactions/cardupdate`;
    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (ex) {
    console.log("error while fetching dashboard data : ", ex);
  }
}

export const getAllTransactions = async () => {
  try {
    const url = `${config.serverURL}/employee/alltransactions`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (ex) {
    console.log("error while fetching dashboard data : ", ex);
  }
}


export const getAddEmployeee = async () => {
  try {
    const url = `${config.serverURL}/employeeCreate`;
    const response = await axios.get(url, {
      headers: {
        Autorization: `Bearer: ${token}`,
      },
    })
    console.log(response);
    return response.data;
  } catch (ex) {
    console.log("error while fetching employee details :", ex);
  }
}

export const applyCard = async () => {
  try {
    const url = `${config.serverURL}/customer/applycard`;
    const response = await axios.post(
      url,
      {}, // Empty body if not needed
      { // Config object as third parameter
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        }
      }
    );
    console.log(response);
    return response.data;
  } catch (ex) {
    console.log("error while fetching employee details :", ex);
  }
}

export const sendMoney = async (body) => {
  try {
    console.log(body);
    const url = `${config.serverURL}/transaction/pay`;
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (ex) {
    console.log("error while fetching dashboard data : ", ex);
  }
}

export async function getAdminStatement() {
  try {
    const url = `${config.serverURL}/admin/alltransactions`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    console.log(response)
    return response;
  } catch (error) {
    console.error("Failed to fetch statement:", error);

    // Optional: Log specific error reason
    if (error.response?.status === 401) {
      console.warn("Unauthorized request – invalid or expired token");
    }

    return null;
  }
}

export async function getAdminCustomer() {
  try {
    const url = `${config.serverURL}/admin/allcustomer`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    console.log(response)
    return response;
  } catch (error) {
    console.error("Failed to fetch statement:", error);

    // Optional: Log specific error reason
    if (error.response?.status === 401) {
      console.warn("Unauthorized request – invalid or expired token");
    }

    return null;
  }
}

export async function getEmployeeCustomer() {
  try {
    const url = `${config.serverURL}/employee/allcustomer`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch statement:", error);

    // Optional: Log specific error reason
    if (error.response?.status === 401) {
      console.warn("Unauthorized request – invalid or expired token");
    }

    return null;
  }
}
export async function getEmployeeStatement() {
  try {
    const url = `${config.serverURL}/employee/alltransactions`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch statement:", error);

    // Optional: Log specific error reason
    if (error.response?.status === 401) {
      console.warn("Unauthorized request – invalid or expired token");
    }

    return null;
  }
}

export async function getAdminEmployee() {
  try {
    const url = `${config.serverURL}/admin/allemployee`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch employee:", error);

    // Optional: Log specific error reason
    if (error.response?.status === 401) {
      console.warn("Unauthorized request – invalid or expired token");
    }

    return null;
  }
}

export async function addNewEmployee(user) {
  try {
    const url = `${config.serverURL}/employee/employeecreate`;
    const response = await axios.post(url, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response: ", response);
    if (response.status === 201) {
      return response;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export async function getPendingCustomer() {
  try {
    const url = `${config.serverURL}/employee/allpendingcustomer`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response: ", response);
    if (response.status === 200) {
      return response;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export async function verifyCustomer(id) {
  try {
    const url = `${config.serverURL}/employee/verifycustomer/${id}`;
    const response = await axios.put(url,
      {},
      {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response: ", response);
    if (response.status === 200) {
      return response;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export async function deleteEmployee(id) {
  try {
    const url = `${config.serverURL}/employee/delete/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response: ", response);
    if (response.status === 200) {
      return response;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export async function deleteCustomer(id) {
  try {
    const url = `${config.serverURL}/customer/delete/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response: ", response);
    if (response.status === 200) {
      return response;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}

export async function activateCustomer(id) {
  try {
    const url = `${config.serverURL}/customer/activate/${id}`;
    const response = await axios.put(url,
      {},
      {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response: ", response);
    if (response.status === 200) {
      return response;
    }
  } catch (ex) {
    console.log("exception:", ex);
  }
}