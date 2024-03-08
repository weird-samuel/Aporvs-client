/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // nationality: "",
    // passportType: "",
    visaType: "",
    visaClass: "",
    processingCountry: "",
    numberOfEntries: "",
    mission: "",
    referenceNumber: `Ref${uuidv4().slice(0, 5)}`,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://aporvis-server.vercel.app/api/user/application?id=${localStorage.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        enqueueSnackbar("Application submitted successfully", {
          variant: "success",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      enqueueSnackbar(`Failed to submit form: ${error.message}`, {
        variant: "error",
      });
    }
  };
  return (
    <section className="border border-[#191D31] rounded-lg p-4 flex justify-between">
      <form method="post" onSubmit={handleSubmit} className="w-full lg:w-2/3">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="visaType">
            Visa Type
          </label>
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="visaType"
            id="visaType"
            value={formData.visaType}
            onChange={handleChange}
            required
          >
            <option value="">Select Visa Type</option>
            <option value="multiple">Multiple Entry</option>
            <option value="single">Single Entry</option>
            <option value="str">STR</option>
            <option value="twp">Temporary Work Permit (TWP)</option>
          </select>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {formData.visaType === "multiple" ? (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="numberOfEntries"
              >
                Number of Entries
              </label>
              <input
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="number"
                min={2} // Minimum value is 2 for multiple entry
                required
                name="numberOfEntries"
                id="numberOfEntries"
                value={formData.numberOfEntries}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="numberOfEntries"
              >
                Number of Entries
              </label>
              <input
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="number"
                max={1} //  value is 1 for other visa types
                required
                name="numberOfEntries"
                id="numberOfEntries"
                value={formData.numberOfEntries}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="visaClass"
            >
              Visa Class
            </label>
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="visaClass"
              id="visaClass"
              value={formData.visaClass}
              onChange={handleChange}
              required
            >
              <option value="">Select Visa Class</option>
              <option value="F6A">F6A - Visiting Visa </option>
              <option value="F7F">
                F7F - Artist/Entertainer/Musician Visa
              </option>
              <option value="F7H">
                F7H - Academic Exchange Programme (Student, scholar, Lecturer)
                Visa
              </option>
              <option value="F4A">F4A - Business - Visa</option>
              <option value="F7B">F7B - Cleric Visa</option>
              <option value="F7K">F7K - Emergency/Relief Work Visa</option>
              <option value="F7J">F7J - Humanitarian Services Visa</option>
              <option value="F7I">
                F7I - International Cultural Exchange Visa
              </option>
              <option value="F7A">F7A - Journalist Visa</option>
              <option value="F7C">F7C - Medical Tourism Visa</option>
              <option value="F7D">F7D - Religious Tourism Visa</option>
              <option value="F7E">F7E - Sport Visa</option>
              <option value="F7L">F7L - Staff of INGO Visa</option>
              <option value="F7M">F7M - Staff of NGO visa</option>
              <option value="F7G">F7G - Study Tour Visa</option>
              <option value="F5A">F5A - Tourism Visa</option>
              <option value="F3B">F3B - Transit Visa</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="passportType"
          >
            Processing Country
          </label>
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="processingCountry"
            id="processingCountry"
            value={formData.processingCountry}
            onChange={handleChange}
            required
          >
            <option value="">Select Processing Country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">
              Bosnia and Herzegovina
            </option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Central African Republic">
              Central African Republic
            </option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo, Democratic Republic of the">
              Congo, Democratic Republic of the
            </option>
            <option value="Congo, Republic of the">
              Congo, Republic of the
            </option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote d'Ivoire">Cote d'Ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor (Timor-Leste)">
              East Timor (Timor-Leste)
            </option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Eswatini">Eswatini</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Greece">Greece</option>
            <option value="Grenada">Grenada</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea, North">Korea, North</option>
            <option value="Korea, South">Korea, South</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar (Burma)">Myanmar (Burma)</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="North Macedonia (formerly Macedonia)">
              North Macedonia (formerly Macedonia)
            </option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Vincent and the Grenadines">
              Saint Vincent and the Grenadines
            </option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="mission">
            Mission
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="mission"
              id="mission"
              value={formData.mission}
              onChange={handleChange}
              required
            >
              <option value="">Select Mission</option>
              <option value="tourism">Tourism</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
            </select>
          </label>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="submit"
            value={"Continue"}
            className="btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA]"
          />
        </div>
      </form>
      <div className="rounded-3xl overflow-hidden shadow-lg bg-[#DCDCDD] hidden m-4 w-1/3">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Your IP is </div>
          <p className="text-gray-700 text-base">234</p>
        </div>
      </div>
    </section>
  );
};

export default UserDetailsForm;
