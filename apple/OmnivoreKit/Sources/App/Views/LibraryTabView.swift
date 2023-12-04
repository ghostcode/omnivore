//
//  File.swift
//
//
//  Created by Jackson Harper on 6/29/23.
//

import Foundation
import Models
import PopupView
import Services
import SwiftUI
import Transmission
import Utils
import Views

@MainActor
struct LibraryTabView: View {
  @EnvironmentObject var dataService: DataService
  @AppStorage(UserDefaultKey.lastSelectedTabItem.rawValue) var selectedTab = "inbox"

  @MainActor
  public init() {
    UITabBar.appearance().isHidden = true
  }

  @StateObject private var followingViewModel = HomeFeedViewModel(
    folder: "following",
    fetcher: LibraryItemFetcher(),
    listConfig: LibraryListConfig(
      hasFeatureCards: false,
      leadingSwipeActions: [.moveToInbox],
      trailingSwipeActions: [.archive, .delete],
      cardStyle: .library
    )
  )

  @StateObject private var libraryViewModel = HomeFeedViewModel(
    folder: "inbox",
    fetcher: LibraryItemFetcher(),
    listConfig: LibraryListConfig(
      hasFeatureCards: true,
      leadingSwipeActions: [.pin],
      trailingSwipeActions: [.archive, .delete],
      cardStyle: .library
    )
  )

  var body: some View {
    VStack {
      TabView(selection: $selectedTab) {
        NavigationView {
          HomeFeedContainerView(viewModel: followingViewModel)
            .navigationViewStyle(.stack)
        }.tag("following")

        NavigationView {
          HomeFeedContainerView(viewModel: libraryViewModel)
            .navigationViewStyle(.stack)
        }.tag("inbox")

        NavigationView {
          ProfileView()
            .navigationViewStyle(.stack)
        }.tag("profile")
      }
      CustomTabBar(selectedTab: $selectedTab)
    }
    .ignoresSafeArea()
    .navigationBarHidden(true)
  }
}
