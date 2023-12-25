import React, { useState } from 'react';

const PatientDetails = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Arsh Verma', relation: 'Self', gender: 'Male', fullName: 'Arsh Verma', mobile: '1234567890', dob: '01-01-1990' },
    { id: 2, name: 'Family Member', relation: 'Family Member', gender: '', fullName: '', mobile: '', dob: '' },
  ]);

  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [newFamilyMember, setNewFamilyMember] = useState({
    relation: '',
    gender: '',
    fullName: '',
    mobile: '',
    dob: '',
  });

  const relations = ['Father', 'Mother', 'Spouse', 'Child', 'Sibling', 'Other'];

  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
    setNewFamilyMember({
      relation: '',
      gender: '',
      fullName: '',
      mobile: '',
      dob: '',
    });
  };

  const handleFamilyMemberChange = (field, value) => {
    setNewFamilyMember((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmPayment = () => {
    // Implement your logic for confirming payment
    console.log('Payment confirmed for:', selectedPatientId ? newFamilyMember : patients.find((p) => p.id === selectedPatientId));
  };

  return (
    <div>
      <h2 className="font-bold mt-10 text-xl mb-6">Patient Details</h2>
      <p className="text-sm text-gray-500 my-4">This In-Clinic Consultation is for</p>
      {patients.map((patient) => (
        <div key={patient.id} onClick={() => handleSelectPatient(patient.id)} className=" p-2 border rounded-md">
            <input
            type="checkbox"
            id={`patientCheckbox-${patient.id}`}
            checked={selectedPatientId === patient.id}
            onChange={() => handleSelectPatient(patient.id)}
            className="h-4 w-4 rounded-full"
            />
            <label htmlFor={`patientCheckbox-${patient.id}`} className="px-4">{patient.name}</label>
        </div>
        ))}

      {/* Add Family Member Form */}
      {selectedPatientId && (
        <div className="mt-6 mb-4">
          <h3 className="font-bold">Select Family members</h3>
          <button className=" bg-green-600 text-white rounded-md px-4 p-1 text-sm my-2">Add Member</button>
          <div className="flex w-auto">
            <div className="flex flex-col w-1/3">
                <label className="text-gray-400">Relation*:</label>
                <select onChange={(e) => handleFamilyMemberChange('relation', e.target.value)}>
                <option value="">Select Relation</option>
                {relations.map((relation) => (
                    <option key={relation} value={relation}>
                    {relation}
                    </option>
                ))}
                </select>
            </div>
            <div className="justify-center">
                <div className="px-10 flex-col">
                    <label className="text-gray-400">Gender:</label>
                    <div className="flex flex-row justify-between">
                        <div className="">
                            <input
                            className=""
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={() => handleFamilyMemberChange('gender', 'Male')}
                            />
                            <label className="pl-2">Male</label>
                        </div>
                        <div className="pl-4">
                            <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={() => handleFamilyMemberChange('gender', 'Female')}
                            />
                            <label className="pl-2">Female</label>
                        </div>
                        <div className="pl-4">
                            <input
                            type="radio"
                            name="gender"
                            value="Other"
                            onChange={() => handleFamilyMemberChange('gender', 'Other')}
                            />
                            <label className="pl-2">Other</label>
                        </div>
                    </div>
                </div>
            </div>
          </div>

        <div className="flex mt-5">
          <div className="w-1/3 flex-col">
            <div>
            <label className="text-gray-400">Full Name*:</label>
            </div>
            <div>
            <input
              className="border-b-2 w-1/3"
              type="text"
              value={newFamilyMember.fullName}
              onChange={(e) => handleFamilyMemberChange('fullName', e.target.value)}
              required
            />
            </div>
          </div>
          <div className="flex flex-col px-10">
            <div>
                <label className="text-gray-400">Mobile No:</label>
            </div>
            <div className="">
                <input
                className="border-b-2"
                type="text"
                value={newFamilyMember.mobile}
                onChange={(e) => handleFamilyMemberChange('mobile', e.target.value)}
                />
            </div>
          </div>
        </div>

        <p className="mt-2 text-sm">Payment invoice will be generated on the name of the patient.</p>

        <div className="flex flex-col mt-8">
            <div>
                <label className="text-gray-400">Date of Birth:</label>
            </div>
            <div>
                <input
                    className="border-b-2 mt-2"
                    type="text"
                    placeholder="dd-mm-yyyy"
                    value={newFamilyMember.dob}
                    onChange={(e) => handleFamilyMemberChange('dob', e.target.value)}
                />
            </div>
        </div>

        <button className="mt-10 rounded-md bg-green-500 text-white p-2 px-6" onClick={handleConfirmPayment}>Confirm Payment</button>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
