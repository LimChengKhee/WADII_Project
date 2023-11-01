<!-- eslint-disable vue/require-v-for-key -->
<template>
   <div class="row bg-gray-100">  
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Confirm deletion of day</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start">
            <div>Are you sure you want to<span class="text-danger fw-bold"> delete day {{deletingDay+1}}</span>?</div>
            <br>
            <div>This will<span class="text-danger fw-bold"> delete ALL activities</span> in day {{ deletingDay+1 }} along with it.</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">No</button>
            <button type="button" class="btn btn-success" @click="this.$refs.dayComp.deleteDay(deletingDay)" data-bs-dismiss="modal">Yes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="min-height-400 position-absolute w-100 px-0" style="background-color: #5E72E4; right:0px"></div>
    <div class="col-3">
      <div v-if="!openModal" style="transition: 3s;" class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
        <div class="sidenav-header">
          <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          <img src="../assets/img/EcoBound.png" class="navbar-brand-img" style="max-height:78px!important;" alt="main_logo">
        </div>
        <hr class="horizontal dark mt-0">
        <div class="collapse navbar-collapse w-auto" style="min-height:700px" id="sidenav-collapse-main">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="itinerary">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Itinerary</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="dashboard">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="flights">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-airplane" viewBox="0 0 16 16" style="color:red">
                    <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/>
                  </svg>
                </div>
                <span class="nav-link-text ms-1">Flights</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="hotels">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16" style="color:green">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                  </svg>
                </div>
                <span class="nav-link-text ms-1">Hotels</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sidenav-footer mx-3">
          <a href="#originCard" class="btn btn-dark btn-sm w-100 mb-3">Change origin location</a>
          <a class="btn btn-dark btn-sm mb-0 w-100" href="#editCard" type="button">Add days / alter dates</a>
        </div>
      </div>
    </div>
    <div class="col-lg-9 col-12 px-0 me-0" style="text-align: start; font-size:22px;">
      <div class="container-fluid p-4">
        <div class="row">
          <div class="col-xl-4 mb-4" style="z-index: 99;">
            <h5 class="font-weight-bolder text-white ms-2">Itinerary</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-xxl-5 col-md-6 col-12 mb-4">
            <div class="card" id="originCard">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-10">
                    <div class="numbers">
                      <p class="text-sm mb-2 text-uppercase font-weight-bold">Origin Location <svg data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="This would be used as a starting point to recommend you activities if there are no previous activities" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill ms-1" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                      </svg></p> 
                      <div class="mt-3 mb-0" id="chooseOrigin">
                        <template v-if="!editOrigin">
                          <div class="input-group pe-0 fs-6" style="max-height:40px;">
                            <input class="form-control d-inline-block" style="max-width:350px; max-height:40px;" type="text" v-model="origin" disabled>
                            <span class="input-group-text" style="max-height:40px; background-color: white;">
                              <button type="button" class="btn" @click="editOrigin = true" style="margin-bottom:0px !important; box-shadow:none;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill mb-0" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                              </button>
                            </span>
                          </div>
                        </template>
                        <template v-else>
                            <div class="input-group pe-0 fs-6" style="max-height:40px;">
                              <input type="text" class="form-control d-inline-block" style="max-width:350px; max-height:40px;" v-model="origin">
                              <button class="btn btn-success" style="margin-bottom:0px !important; box-shadow:none;" type="button" @click="verifyLocation" data-bs-toggle="modal" data-bs-target="#confirmLocModal">✔</button>
                              <button class="btn btn-danger" style="margin-bottom:0px !important; box-shadow:none;" type="button" @click="origin = baseOrigin, editOrigin = false">✖</button>
                            </div>
                            <div class="modal fade" id="confirmLocModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1 class="modal-title fs-5">Confirm place</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="editOrigin = false"></button>
                                  </div>
                                  <template v-if="originResult != 'Place not found'">
                                    <div class="modal-body">
                                      <p class="fw-semibold text-primary">Is this the place you are looking for?</p>
                                      <p><span class="fw-semibold">Name:</span> {{originResult.name}}</p>
                                      <p><span class="fw-semibold">Address:</span> {{originResult.formatted_address}}</p>
                                    </div>
                                  </template>
                                  <template v-else>
                                    <div class="modal-body">
                                      <p class="fw-semibold text-danger">We couldn't find the place you entered. Please try again</p>
                                    </div>
                                  </template>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="editOrigin = false, origin = baseOrigin">No</button>
                                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="setOrigin">Yes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="col-2 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" style="color:white; margin-top:8px; margin-bottom:8px;" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-5 offset-xxl-1 col-md-6 col-12 mb-4">
            <div class="card" id="editCard">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-10">
                    <div class="numbers">
                      <p class="text-sm mb-2 text-uppercase font-weight-bold">Edit dates<svg data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Use the datepicker to alter your itinerary length, or add days manually." xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill ms-1" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                      </svg></p> 
                      <div class="input-group pe-0 mt-3 mb-0" style="max-width:380px">
                        <Datepicker class="w-md-75" style="height:40px" id='datepick' :min-date="date[0]" :model-value="date" :clearable="false" @update:model-value="selectDate" range :enable-time-picker="false"/>
                        <button id='addDay' @click="addDaystoEnd(1)" style="height:38px; margin-top:1px;" class="btn btn-success mb-0" :disabled="this.days.length==0" type="button">
                          ✚
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-2 text-end">
                    <div class="icon icon-shape bg-gradient-warning shadow-primary text-center rounded-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="color:white; margin-top:8px; margin-bottom:8px;" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16">
                        <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-lg-4 m">
          <div class="col-xxl-5 col-12 col-md-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-10">
                    <div class="numbers">
                      <p class="text-sm mb-2 text-uppercase font-weight-bold">Flights <svg data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Please head to the flights page for more information" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill ms-1" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                      </svg></p> 
                      <div class="mt-3 mb-0"><!--INSERT FLIGHTS HERE--></div>
                    </div>
                  </div>
                  <div class="col-2 text-end">
                    <div class="icon icon-shape bg-gradient-danger shadow-primary text-center rounded-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="color:white; margin-top:8px; margin-bottom:8px;" fill="currentColor" class="bi bi-airplane-fill" viewBox="0 0 16 16">
                        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-5 offset-xxl-1 col-md-6 col-12 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-10">
                    <div class="numbers">
                      <p class="text-sm mb-2 text-uppercase font-weight-bold">Hotels<svg data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Please head to the hotels page for more information" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill ms-1" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                      </svg></p> 
                      <div class="mt-3 mb-0"> <!--INSERT HOTELS HERE--> </div>
                    </div>
                  </div>
                  <div class="col-2 text-end">
                    <div class="icon icon-shape bg-gradient-success shadow-primary text-center rounded-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="color:white; margin-top:8px; margin-bottom:8px;" fill="currentColor" class="bi bi-building-fill" viewBox="0 0 16 16">
                        <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3Zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-6 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2">Days at a Glance</h6>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center ">
                <tbody>
                  <tr v-for="day in days" :key="day.dayId">
                    <td class="w-30">
                      <div class="d-flex px-2 py-1 align-items-center">
                        <div>
                          {{ day.dayId + 1 }}
                        </div>
                        <div class="ms-4">
                          <p class="text-xs font-weight-bold mb-0">Date</p>
                          <h6 class="text-sm mb-0">{{this.$refs.dayComp.getPrintableDate(day.dayId)}}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-end me-3">
                        <p class="text-xs font-weight-bold mb-0">Number of activities:</p>
                        <h6 class="text-sm mb-0">{{ day.dayActivities.length }}</h6>
                      </div>
                    </td>
                    <td>
                      <div class="text-end me-3">
                        <p class="text-xs font-weight-bold mb-0">Jump to day</p>
                        <h6 class="text-sm mb-0"><a style="text-decoration: underline !important;" :href="'#Day' + day.dayId + 'Row'">Click here</a></h6>
                      </div>
                    </td>
                    <td>
                      <div class="text-end me-3">
                        <h6 class="text-sm mb-0"> 
                          <button type="button" @click="deletingDay = day.dayId, openModal = true" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-outline-danger mb-0" style="width: 50px; --bs-btn-font-size: 0.6rem;">✖</button>
                        </h6>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
         <!--<div v-if="slicedArr.length > 0 && days.length > 0" class="header" style="text-align: start; font-size:20px;">
      <p class="mb-3 fw-bold">Suggested Activities</p>
    </div>

    <div v-if="slicedArr.length > 0 && days.length > 0" id="activityCarousel" class="carousel slide w-75 mb-5">
      <div class="carousel-inner position-relative">
        <div class="carousel-item" v-for='(set,index) in slicedArr' :class="{active: index == 0}">
          <div class="card-group">
              <div v-for='(activity,itemIndex) in set' class="card" style="width: 18rem;">
                  <img :src="this.$refs.dayComp.getImage(activity.photo)" height="210" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title fw-semibold" style="height:48px">{{activity.name}}</h5>
                      <p class="card-text" style="height:48px">Address: {{activity.address}}</p>
                      <p class="card-text">Ratings: {{activity.rating[0]}} ({{activity.rating[1]}} reviews)</p>
                      <a :href="activity.url" class=" text-dark fw-bold" target="_blank">Link</a>
                      <div class="input-group my-3">
                        <span class="input-group-text col" id="basic-addon1">Day Number</span>
                        <input type="number" min="1" max="days.length" class="col form-control" v-model="addTopAttractionDay[index][itemIndex]">
                      </div>
                      <div class="row">
                        <button v-if="addTopAttractionDay[index][itemIndex] > 0 && addTopAttractionDay[index][itemIndex] <= days.length" class="btn btn-success" type="button" @click="addAttraction(index,itemIndex)">
                            Add to Itinerary
                          </button>
                        <p v-else class="text-danger">
                          Please enter a valid day number.
                        </p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev carousel-back-button" type="button" data-bs-target="#activityCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next carousel-next-button" type="button" data-bs-target="#activityCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div> -->
        <div class="col-lg-6"> <!--Possible condition to not show unless loaded? Add to day? Link?-->
          <div class="card card-carousel overflow-hidden h-100 p-0">
            <div id="activityCarousel" class="carousel slide h-100" data-bs-ride="carousel">
              <div class="carousel-inner border-radius-lg h-100">
                <div v-for="(attr,index) in topAttractions" :key="attr.name" class="carousel-item h-100" :class="{active: index == 0}" :style="{'backgroundImage': 'url(' + this.$refs.dayComp.getImage(attr.photo)+ ')', 'background-size': 'cover'}">
                  <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                    <h5 class="text-white mb-1">{{attr.name}}</h5>
                    <p class="fw-bold">{{ attr.address }}</p>
                    <p class="fw-bold">{{attr.rating[0]}} ({{attr.rating[1]}} reviews)</p>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev w-5 me-3" type="button" data-bs-target="#activityCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next w-5 me-3" type="button" data-bs-target="#activityCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        </div>
        <Day_Component ref="dayComp" :days="days" :date="date" :originLoc="originLoc" :originName="origin" :openModal="openModal"></Day_Component>
      </div>
    </div>
    


  </div>



</template>
  <script>
  import Day_Component from '../components/DayComponent.vue';
  import Datepicker from '../../node_modules/@vuepic/vue-datepicker';
  import '/node_modules/@vuepic/vue-datepicker/dist/main.css';
  import * as bootstrap from 'bootstrap'
  //  import statements
  // import example from '@/utils/string_formatter'
  export default {
    name: 'Itinerary_Page',
    components: { 
      // importing components from other places
      Day_Component,
      Datepicker,
    },
    data () {
      // local repository of information
      return {
        openModal: false,
        deletingDay: 0,
        date : [],
        itemNum : 0,
        days: [ // days is an array of dayObjects, each dayObject contains dayId, and an array of activity objects (dayActivities)

      ],
        addTopAttractionDay: [[1,1,1],[1,1,1],[1,1,1]],
        topAttractions: [],
        baseOrigin: "The Fullerton Hotel Sydney",
        origin: "The Fullerton Hotel Sydney",
        editOrigin: false,
        originResult: "",
        originLoc: "",
      }
    },
    computed: {
      // computed
  
    },
  
    // start of lifecycle
    async mounted () {
      if (this.date.length == 0){
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
        this.date = [startDate, endDate];
      }
      this.initialiseOrigin();
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
      const myCarouselElement = document.querySelector('#activityCarousel')
      const carousel = new bootstrap.Carousel(myCarouselElement, {
      interval: 3000,
      touch: true
      })
      // if (this.topAttractions.length == 0){
      //     this.getSlicedArr()
      //   }

      // const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]')
      // console.log(modalTriggerList)
      // for (let modal of modalTriggerList){

      //   let testModal = document.getElementById("deleteModal")
      //   testModal.addEventListener('hidden.bs.modal', event => {
      //   this.openModal = false
      //   // do something...
      // })
    },
  
    methods: {
      changeOpenModal(){
        if (this.openModal == true){
          this.openModal = false
        }else{
          this.openModal = true
        }
      },
      // methods defined by ourselves
      initialiseOrigin(){
        this.$refs.dayComp.findPlace(this.origin,['geometry']).then(result => {
          if (result == "No results"){
            this.originLoc = ''
          }else{
            this.originLoc = result.geometry.location
          }
        })
      },
      setOrigin(){
        this.originLoc = this.originResult.geometry.location
        this.origin = this.originResult.name
        this.baseOrigin = this.origin
        this.editOrigin = false
      },
      verifyLocation(){
        this.originResult = ""
        this.$refs.dayComp.findPlace(this.origin,['geometry','name','formatted_address'],this.originLoc).then(result =>{
          if (result == "No results"){
              this.originResult = "Place not found"
          }else{
            this.originResult = result
          }
        })
      },
      getSlicedArr(){
        this.$refs.dayComp.getTopAttractions().then(result =>{
          this.topAttractions = result
          console.log(this.topAttractions)
        })
      },
      addAttraction(index,itemIndex){
        var dayNum = this.addTopAttractionDay[index][itemIndex]
        this.addTopAttractionDay[index][itemIndex] = 1
        var act = this.slicedArr[index][itemIndex]
        var actName = act.name
        var actDesc = act.address
        var type = act.type
        var image = act.photo
        this.days[dayNum-1].dayActivities.push({'name':actName, 'description':actDesc, 'image':image, 'type':type})

        },
      addDaystoEnd(numDays){
        for (let i=0;i<numDays;i++){
          this.days.push({
            dayId: this.days.length,
            dayActivities: []
          })
        }
          let currentEnd = this.date[1]
          this.date[1].setDate(currentEnd.getDate() + numDays)
          // this.date[1] = new Date(this.date[1].getTime() + (i * 24 * 60 * 60 * 1000));
      },
      addDaystoStart(numDays){
        for (let i=0;i<numDays;i++){
          this.days.unshift({
            dayId: 0,
            dayActivities: []
          })
        }
        for (let i=0;i<this.days.length;i++){
          this.days[i].dayId = i
        }
        let currentStart = this.date[0]
        this.date[0].setDate(currentStart.getDate() - numDays)
      },
      removeDaysfromStart(diff){
        this.days.splice(0,diff)
        for (let i=0;i<this.days.length;i++){
          this.days[i].dayId = i
        }
        let currentStart = this.date[0]
        this.date[0].setDate(currentStart.getDate() + diff)
      },
      removeDaysfromEnd(diff){
        this.days = this.days.slice(0,this.days.length-diff)
        let currentEnd = this.date[1]
        this.date[1].setDate(currentEnd.getDate() - diff)
      },
      selectDate(newDate){
        if (this.days.length == 0){
          let start = newDate[0];
          let end = newDate[1];
          let days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
          for (let i=0;i<days+1;i++){
              this.days.push({
                dayId: this.days.length,
                dayActivities: [],
            })
          }
          this.date = newDate;
        }else{
          let newStart = newDate[0];
          let newEnd = newDate[1];
          let startDate = this.date[0];
          let endDate = this.date[1];
          if (startDate > newStart){
            let numDays = Math.floor((startDate - newStart) / (1000 * 60 * 60 * 24));
            this.addDaystoStart(numDays)
          }else if (startDate < newStart){
            let diff = Math.floor((newStart-startDate) / (1000 * 60 * 60 * 24));
            this.removeDaysfromStart(diff)
          }
          if (endDate > newEnd){
            let diff = Math.floor((endDate-newEnd) / (1000 * 60 * 60 * 24));
            this.removeDaysfromEnd(diff)
          }else if (endDate < newEnd){
            let numDays = Math.floor((newEnd - endDate) / (1000 * 60 * 60 * 24));
            this.addDaystoEnd(numDays);
          }
        }
        this.$refs.dayComp.setTriggers()
      },
    }
    
      }
  </script>
  
  <style scoped>
  
  </style>
  